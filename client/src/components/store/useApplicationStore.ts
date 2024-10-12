import {ILanguage} from "@/lib/misc/translator";
import {
    create,
    StoreApi,
    UseBoundStore
}                  from "zustand";

export interface TApplicationState {
    name: string,
    locale: ILanguage | undefined,
    spinning: boolean,
    changeLanguage: (language: string) => unknown,
    setName: (name: string) => void,
    setLocale: (locale: ILanguage | undefined) => void,
    setSpinning: (spinning: boolean) => void,
    setChangeLanguage: (callback: (language: string) => unknown) => void,
}

export const useApplicationStore: UseBoundStore<StoreApi<TApplicationState>> = create<TApplicationState>(set => ({
    name:              "",
    locale:            undefined,
    spinning:          false,
    changeLanguage:    language => language,
    setName:           (name) => set({name: name}),
    setLocale:         (locale) => set({locale: locale}),
    setSpinning:       (spinning) => set({spinning: spinning}),
    setChangeLanguage: (callback) => set({changeLanguage: callback})
}));