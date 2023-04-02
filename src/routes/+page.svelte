<script lang="ts">
    import AccountWrapper from "$lib/components/AccountWrapper.svelte";
    import AddTrickleAccount from "$lib/components/AddTrickleAccount.svelte";
    import {
        accounts,
        highToLow,
        lowToHigh,
    } from "$lib/components/tricklestore";
    import { calculateProfitPercentage } from "$lib/components/ProfitPercentWrapper.svelte";
    import ProfitShareWrapper from "$lib/components/ProfitShareWrapper.svelte";
    import { each } from "svelte/internal";

    let totalProfitsApplied = 0;
    let overallExtraProfits = 0;

    function applyProfits() {
        totalProfitsApplied++;
        accounts.update((accountData) => {
            const profits: number[] = [];

            const updatedAccounts = [...accountData];

            /**
             * Get profits total
             */
            for (let i = 0; i < updatedAccounts.length; i++) {
                const {
                    balance,
                    profitPercent,
                    balanceWithoutProfitCut,
                } = updatedAccounts[i];
                const calculatedProfit =
                    balance *
                    calculateProfitPercentage(profitPercent);
                console.log("calculatedProfit", calculatedProfit);

                updatedAccounts[i].balanceWithoutProfitCut +=
                    balanceWithoutProfitCut *
                    calculateProfitPercentage(profitPercent);

                profits[i] = calculatedProfit;
            }

            /**
             * Calculate Profit cuts
             */
            for (let i = 0; i < updatedAccounts.length; i++) {
                let totalProfit = profits[i];

                for (
                    let k = 0;
                    k < updatedAccounts[i].profitShares.length;
                    k++
                ) {
                    const { targetID, profitPercent } =
                        updatedAccounts[i].profitShares[k];
                    const targetAccount = accountData[targetID];

                    if (!targetAccount) continue;

                    const profitCut =
                        totalProfit *
                        calculateProfitPercentage(profitPercent);
                    totalProfit -= profitCut;

                    console.log("targetAccount", targetAccount);
                    targetAccount.balance += profitCut;

                    updatedAccounts[i].profitShares[
                        k
                    ].profitPassedToTarget += profitCut;
                }
                updatedAccounts[i].balance += totalProfit;
            }

            /**
             * Calculate Profit excess
             */
            overallExtraProfits = 0;
            updatedAccounts.forEach((accountData) => {
                overallExtraProfits +=
                    accountData.balance -
                    accountData.balanceWithoutProfitCut;
            });

            return updatedAccounts;
        });
    }

    function onApplyExample() {
        totalProfitsApplied = 0;
        overallExtraProfits = 0;
    }

    interface ExampleButtons {
        action: () => void;
        label: string;
    }

    let exampleButtons: ExampleButtons[] = [
        {
            action: () => {
                onApplyExample();
                accounts.set([]);
            },
            label: "Clear Data",
        },
        {
            action: () => {
                onApplyExample();
                accounts.set(lowToHigh);
            },
            label: "Low to High Risk",
        },
        {
            action: () => {
                onApplyExample();
                accounts.set(highToLow);
            },
            label: "High to Low Risk",
        },
    ];
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Trickle System Example" />
</svelte:head>

<section>
    <h1>Trickle System Example</h1>

    <h2>Load examples:</h2>
    <div class="flex">
        {#each exampleButtons as { action, label }}
            <button on:click={action}>
                {label}
            </button>
            &nbsp;
        {/each}
    </div>
    <br />
    <br />

    <AddTrickleAccount />
    <br />
    <h3>Accounts:</h3>
    {#each $accounts as account, i}
        <AccountWrapper index={i} {...account} />
    {/each}
    <br />
    <button on:click={applyProfits}>Apply Profits</button>
    <table>
        <tbody>
            <tr>
                <td> Total profits applied: </td>
                <td>
                    {totalProfitsApplied}
                </td>
            </tr>
            <tr>
                <td>Profit Sharing Overall Extra Profit:</td>
                <td>
                    <green>{overallExtraProfits.toFixed(4)}</green>
                </td>
            </tr>
        </tbody>
    </table>

    {#if $accounts.length > 0}
        <br />
        <h3>Link Accounts:</h3>

        {#each $accounts as account, i}
            <ProfitShareWrapper
                index={i}
                profitShares={account.profitShares}
            />
        {/each}
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }
</style>
