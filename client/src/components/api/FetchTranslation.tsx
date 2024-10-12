import {useTranslationQuery} from "@/components/api/queries/useTranslationQuery";
import {useApplicationStore} from "@/components/store/useApplicationStore";
import {useQueryResult}      from "@/lib/hooks/useQueryResult";
import {mapTranslations}     from "@/lib/misc/translator";
import i18next               from "i18next";
import {type FC}             from "react";

export const FetchTranslation: FC = () => {
    const translationResult = useTranslationQuery();
    const setSpinning       = useApplicationStore((state) => state.setSpinning);
    const locale            = useApplicationStore((state) => state.locale);

    //Load translations
    useQueryResult({
        result:     translationResult,
        onFetching: () => setSpinning(true),
        onSettled:  () => setSpinning(false),
        onSuccess:  async (data) => {
            //Load translations
            Object.keys(data).forEach((domainKey: string): void => {
                Object.keys(data[domainKey]).forEach((localeKey: string): void => {
                    // console.log(data, domainKey, localeKey);
                    i18next.addResources(localeKey, domainKey, mapTranslations(data[domainKey][localeKey]));
                });
            });
            //Change Language to Default
            await i18next.changeLanguage(locale?.locale ?? 'de-DE');
        }
    });

    return null;
}