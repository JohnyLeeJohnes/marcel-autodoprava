import {
    createContext,
    useContext
} from "react";

export interface INextStepContext {
    nextDisabled: boolean | undefined,

    setNextDisabled(visible: boolean): void;
}

export interface IPrevStepContext {
    prevDisabled: boolean | undefined,

    setPrevDisabled(visible: boolean): void;
}

export const NextStepContext = createContext<INextStepContext>(null as any);
export const PrevStepContext = createContext<IPrevStepContext>(null as any);

export const useNextStepContext = () => useContext(NextStepContext);
export const usePrevStepContext = () => useContext(PrevStepContext);
