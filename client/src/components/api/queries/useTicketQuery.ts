import {useAxiosClient} from "@/lib/misc/axios-client";
import {useQuery}       from "@tanstack/react-query";
import {
    useEffect,
    useState
}                       from "react";

export const useTicketQuery = () => {
    const axiosClient           = useAxiosClient();
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setEnabled(false);
            return;
        }
        const timeoutId = setTimeout(() => setEnabled(true), 30000);
        return () => clearTimeout(timeoutId);
    }, []);

    return useQuery({
        enabled:         enabled,
        refetchInterval: 60000,
        refetchOnMount:  false,
        retry:           false,
        queryKey:        ['/ticket'],
        queryFn:         async (): Promise<string> => {
            const {data} = await axiosClient.post('/ticket');
            return data;
        }
    });
}