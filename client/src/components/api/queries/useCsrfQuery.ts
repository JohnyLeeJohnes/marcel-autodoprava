import {useAxiosClient} from "@/lib/misc/axios-client";
import {useQuery}       from "@tanstack/react-query";

export namespace useCsrfQuery {
    export type Result = string;
}

export const useCsrfQuery = () => {
    const axiosClient = useAxiosClient();
    return useQuery({
        queryKey: ['/security/csrf'],
        queryFn:  async (): Promise<useCsrfQuery.Result> => {
            const {data} = await axiosClient.post('/security/csrf');
            return data;
        }
    });
}