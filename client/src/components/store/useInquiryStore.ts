import {
    create,
    StoreApi,
    UseBoundStore
} from "zustand";

export interface IInquiryState {
    nextStep: () => void;
    prevStep: () => void;
    errorMachines: Set<number> | undefined;
    setNextStep: (callback: () => void) => void;
    setPrevStep: (callback: () => void) => void;
    setErrorMachines: (errorMachines: Set<number> | undefined) => void;
}

export const useInquiryStore: UseBoundStore<StoreApi<IInquiryState>> = create<IInquiryState>(set => ({
    nextStep:         () => {
    },
    prevStep:         () => {
    },
    errorMachines:    undefined,
    setNextStep:      (callback) => set({nextStep: callback}),
    setPrevStep:      (callback) => set({prevStep: callback}),
    setErrorMachines: (errorMachines: Set<number> | undefined) => set({errorMachines: errorMachines})
}));