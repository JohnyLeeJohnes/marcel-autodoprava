import {useAxiosClient} from "@/lib/misc/axios-client";
import {useQuery}       from "@tanstack/react-query";

export const useTranslationQuery = () => {
    const axiosClient = useAxiosClient();
    return useQuery({
        refetchOnWindowFocus: false,
        queryKey:             ['/config/translations'],
        queryFn:              async () => {
            const {data} = await axiosClient.post('/config/translations');
            return data;
        }
    });
}