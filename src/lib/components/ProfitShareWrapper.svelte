<script lang="ts">
    import AccountIdSelect from "./AccountIDSelect.svelte";
    import Input from "./Input.svelte";
    import ProfitShareEntry from "./ProfitShareEntry.svelte";
    import {
        accounts,
        type AccountProfitShareEntry,
    } from "./tricklestore";

    export let index: number;
    export let profitShares: AccountProfitShareEntry[] = [];

    let profitPercent: number;
    let targetID: number;

    function addProfitShare() {
        accounts.update((accountData) => {
            accountData[index].profitShares.push({
                targetID,
                profitPercent,
                profitPassedToTarget: 0,
            });
            return accountData;
        });
    }
</script>

<div class="ProfitShareWrapper">
    <div class="ProfitShareAdder">
        ID: {index} - Target ID:

        <AccountIdSelect bind:selected={targetID} parentID={index} />
        - Profit Split %
        <Input bind:value={profitPercent} />
        <button on:click={addProfitShare} disabled={targetID === -1}
            >Add Profit Share</button
        >
    </div>

    {#each profitShares as shareEntry, i}
        <ProfitShareEntry
            {...shareEntry}
            parentIndex={index}
            index={i}
        />
    {/each}
</div>

<style>
    .ProfitShareWrapper {
        border: 2px solid rgba(222, 11, 11, 0.2);
        padding: 20px;
        border-radius: 5px;
        width: 100%;
        max-width: 800px;
    }
    .ProfitShareAdder {
        display: grid;
        gap: 5px;
        align-items: center;
        grid-template-columns: auto auto auto 70px auto;

        padding-bottom: 10px;
    }
</style>
