import {
    create,
    StoreApi,
    UseBoundStore
} from "zustand";

export interface IScrollStore {
    priceListScrollFunction: (params?: any) => void;
    contactScrollFunction: (params?: any) => void;
}

export const useScrollStore: UseBoundStore<StoreApi<IScrollStore>> = create<IScrollStore>(set => ({
    priceListScrollFunction: (scrollFunction: any) => set({priceListScrollFunction: scrollFunction}),
    contactScrollFunction:   (scrollFunction: any) => set({contactScrollFunction: scrollFunction}),
}));