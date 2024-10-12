import {useAxiosClient} from "@/lib/misc/axios-client";
import {ILanguage}      from "@/lib/misc/translator";
import {useQuery}       from "@tanstack/react-query";

namespace useConfigQuery {
    export interface Result {
        locale: ILanguage[],
        defaultLocale: string,
    }
}

export const useConfigQuery = () => {
    const axiosClient = useAxiosClient();
    return useQuery({
        refetchOnWindowFocus: false,
        queryKey:             ['/config/configuration'],
        queryFn:              async (): Promise<useConfigQuery.Result> => {
            const {data} = await axiosClient.post('/config/configuration');
            return data;
        }
    });
}