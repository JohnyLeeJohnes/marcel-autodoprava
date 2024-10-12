import {ILanguage} from "@/lib/misc/translator";
import {
    create,
    StoreApi,
    UseBoundStore
}                  from "zustand";

export interface TConfigurationState {
    languages: ILanguage[]
    defaultLocale: string;
    setLanguages: (languages: ILanguage[]) => void;
    setDefaultLocale: (defaultLocale: string) => void;
}

export const useConfigurationStore: UseBoundStore<StoreApi<TConfigurationState>> = create<TConfigurationState>(set => ({
    languages:        [],
    defaultLocale:    "",
    setLanguages:     (languages: ILanguage[]) => set({languages: languages}),
    setDefaultLocale: (defaultLocale: string) => set({defaultLocale: defaultLocale}),
}));