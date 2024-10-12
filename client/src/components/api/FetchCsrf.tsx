import {useCsrfQuery}        from "@/components/api/queries/useCsrfQuery";
import {useApplicationStore} from "@/components/store/useApplicationStore";
import {useQueryResult}      from "@/lib/hooks/useQueryResult";
import {UseFormReturnType}   from "@mantine/form";
import {type FC}             from "react";

export namespace FetchCsrf {
    export interface Props {
        form: UseFormReturnType<any>;
    }
}

export const FetchCsrf: FC<FetchCsrf.Props> = ({form}) => {
    const csrfResult  = useCsrfQuery();
    const setSpinning = useApplicationStore((state) => state.setSpinning);

    useQueryResult({
        result:     csrfResult,
        onFetching: () => setSpinning(true),
        onSettled:  () => setSpinning(false),
        onSuccess:  async (data) => form.setFieldValue("csrf_token", data),
    });

    return null;
}