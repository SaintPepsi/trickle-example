<script lang="ts">
    import Input from "./Input.svelte";
    import ProfitPercentWrapper from "./ProfitPercentWrapper.svelte";
    import { accounts } from "./tricklestore";

    export let index: number;
    export let balance = 0;
    export let balanceWithoutProfitCut: number;
    export let profitPercent = 0;

    $: {
        accounts.update((accountsData) => {
            const balanceModified =
                balance !== accountsData[index].balance;
            accountsData[index].balanceWithoutProfitCut =
                balanceModified
                    ? balance
                    : accountsData[index].balanceWithoutProfitCut;
            accountsData[index].balance = balance;
            accountsData[index].profitPercent = profitPercent;
            return accountsData;
        });
    }

    function removeCurrent() {
        accounts.update((accountsData) => {
            accountsData.splice(index, 1);
            accountsData.forEach((accountEntry) => {
                accountEntry.profitShares;
                for (
                    let i = accountEntry.profitShares.length - 1;
                    i >= 0;
                    i--
                ) {
                    const { targetID } = accountEntry.profitShares[i];
                    if (targetID === index) {
                        accountEntry.profitShares.splice(i, 1);
                    }
                }
            });
            return accountsData;
        });
    }
</script>

<div class="AccountWrapper">
    <div>
        ID: {index} - Balance:
    </div>
    <Input bind:value={balance} />
    <ProfitPercentWrapper bind:profitPercent />

    <button on:click={removeCurrent}>🗑️</button>
    <div class="AccountWrapperWithoutSharing">
        <span>Balance With Profit Sharing:&nbsp;</span>
        <green> {balance}</green>
    </div>
    <div class="AccountWrapperWithoutSharing">
        <span>Balance Without Profit sharing:&nbsp;</span>
        <green> {balanceWithoutProfitCut}</green>
    </div>
</div>

<style>
    .AccountWrapper {
        display: grid;
        grid-template-columns: auto 120px auto 70px 44px;
        align-items: center;

        gap: 5px;
        margin-top: 10px;
        border-top: 1px solid gray;
        padding-top: 10px;
    }
    .AccountWrapperWithoutSharing {
        margin-top: 5px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        justify-content: flex-start;
        grid-column: span 5;
    }
</style>
