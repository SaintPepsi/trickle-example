<script lang="ts">
    import Input from "./Input.svelte";
    import ProfitPercentWrapper from "./ProfitPercentWrapper.svelte";
    import { accounts } from "./tricklestore";

    let balance = 1;
    let profit = 0.1;

    function addTrickleAccount() {
        accounts.update((currentAccounts) => [
            ...currentAccounts,
            { balance, profit, profitShares: [] },
        ]);
    }
</script>

<div class="AddTrickleAccount">
    Balance: <Input bind:value={balance} />
    <ProfitPercentWrapper bind:profit />
    <button on:click={addTrickleAccount}>
        Add Trickle Account
    </button>
</div>

<style>
</style>
