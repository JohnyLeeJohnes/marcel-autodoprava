import {
    TApplicationState,
    useApplicationStore
}                       from "@/components/store/useApplicationStore";
import {useTranslation} from "react-i18next";

export interface ILanguage {
    label: string,
    locale: string,
    countryCode: string,
    msatCookieCode: string,
}

export interface KeyValueData {
    value: string;
    label: string;
}

export interface Translation {
    key: string,
    translation: string,
}

export const fallbackLanguage = 'en-GB';

export const mapTranslations = (data: Translation[]): {} => {
    let translatedData: any = {};
    data.forEach((item: Translation): void => {
        if (item.key && item.translation) {
            translatedData[item.key] = item.translation;
        }
    });
    return translatedData;
}

export const translateKeyValue = (data: KeyValueData[], t: any): KeyValueData[] => {
    let tmp: KeyValueData[] = [];
    data.forEach((item: KeyValueData): void => {
        tmp.push({value: item.value, label: t(item.label)});
    })
    return tmp;
}

export const useTranslator = () => {
    const {t}    = useTranslation('john-deere');
    const locale = useApplicationStore((state: TApplicationState) => state.locale);

    function tr(key: string, hideKey?: boolean | null): string {
        if (locale?.locale == "-") {
            return t(key);
        }
        if (key === t(key) && hideKey) {
            return "";
        } else {
            return t(key);
        }
    }

    return {tr};
}