<script lang="ts">
    import { accounts } from "./tricklestore";

    export let parentID: number;
    export let selected: number;

    let selectableAccounts: number[] = [];
    accounts.subscribe((accountData) => {
        selectableAccounts = accountData
            .map((_, i) => {
                return i;
            })
            .filter((_, i) => i !== parentID);

        if (!selectableAccounts.includes(selected)) {
            selected = -1;
        }
    });
</script>

<div class="AccountIDSelect">
    <select bind:value={selected}>
        {#each selectableAccounts as index}
            <option value={index}>
                {index}
            </option>
        {/each}
    </select>
</div>

<style>
</style>
