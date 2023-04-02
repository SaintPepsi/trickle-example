<script context="module" lang="ts">
    export function calculateProfitPercentage(percent: number) {
        return percent / 100;
    }
</script>

<script lang="ts">
    import Input from "./Input.svelte";
    export let profitPercent: number;
</script>

Profit%<Input bind:value={profitPercent} />
