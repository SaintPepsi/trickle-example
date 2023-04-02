<script lang="ts">
    import AccountIdSelect from "./AccountIDSelect.svelte";
    import Input from "./Input.svelte";
    import { accounts } from "./tricklestore";

    export let parentIndex: number;
    export let index: number;
    export let targetID: number;
    export let profitPercent: number;
    export let profitPassedToTarget: number;

    $: {
        accounts.update((accountData) => {
            accountData[parentIndex].profitShares[index] = {
                profitPercent,
                targetID,
                profitPassedToTarget: 0,
            };
            return accountData;
        });
    }

    function removeCurrent() {
        accounts.update((accountData) => {
            accountData[parentIndex].profitShares.splice(index, 1);

            return accountData;
        });
    }
</script>

<div class="ProfitShareEntry">
    🔗 - TargetID: <AccountIdSelect
        bind:selected={targetID}
        parentID={parentIndex}
    />
    percentage of profit: <Input bind:value={profitPercent} />
    Profits Shared With Target:
    <green>{profitPassedToTarget.toFixed(4)}</green>
    <button on:click={removeCurrent}>🗑️</button>
</div>

<style>
    .ProfitShareEntry {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid gray;
        padding-top: 10px;
    }

    .ProfitShareEntry :global(.Input) {
        width: 60px;
    }
</style>
