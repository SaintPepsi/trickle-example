import { writable } from "svelte/store";

export interface AccountProfitShareEntry {
    targetID: number;
    profitPercent: number;
    profitPassedToTarget: number;
}

export interface AccountData {
    balance: number;
    balanceWithoutProfitCut: number;
    profitPercent: number;
    profitShares: AccountProfitShareEntry[];
}

export const lowToHigh = [
    {
        balance: 10000,
        balanceWithoutProfitCut: 10000,
        profitPercent: 0.1,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 1,
                profitPassedToTarget: 0,
            },
        ],
    },
    {
        balance: 1000,
        balanceWithoutProfitCut: 1000,
        profitPercent: 0.25,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 2,
                profitPassedToTarget: 0,
            },
        ],
    },
    {
        balance: 500,
        balanceWithoutProfitCut: 500,
        profitPercent: 0.5,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 3,
                profitPassedToTarget: 0,
            },
        ],
    },
    {
        balance: 150,
        balanceWithoutProfitCut: 150,
        profitPercent: 1,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 0,
                profitPassedToTarget: 0,
            },
        ],
    },
];
export const highToLow = [
    {
        balance: 10000,
        balanceWithoutProfitCut: 10000,
        profitPercent: 0.1,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 3,
                profitPassedToTarget: 0,
            },
        ],
    },
    {
        balance: 1000,
        balanceWithoutProfitCut: 1000,
        profitPercent: 0.25,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 0,
                profitPassedToTarget: 0,
            },
        ],
    },
    {
        balance: 500,
        balanceWithoutProfitCut: 500,
        profitPercent: 0.5,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 1,
                profitPassedToTarget: 0,
            },
        ],
    },
    {
        balance: 150,
        balanceWithoutProfitCut: 150,
        profitPercent: 1,
        profitShares: [
            {
                profitPercent: 10,
                targetID: 2,
                profitPassedToTarget: 0,
            },
        ],
    },
];

export const accounts = writable<AccountData[]>(lowToHigh);
