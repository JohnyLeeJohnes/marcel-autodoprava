import {useTicketQuery} from "@/components/api/queries/useTicketQuery";
import {useQueryResult} from "@/lib/hooks/useQueryResult";
import {type FC}        from "react";


export const FetchTicket: FC = () => {
    const ticketResult = useTicketQuery();

    //Check if user has session
    useQueryResult({
        result:    ticketResult,
        onSuccess: async () => console.log(ticketResult.data),
        onError:   async () => console.error("NO-SESSION"),
    })

    return null;
}