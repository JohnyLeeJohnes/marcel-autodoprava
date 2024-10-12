import {useContactForm}    from "@/components/form/useContactForm";
import {useAxiosClient}    from "@/lib/misc/axios-client";
import {UseFormReturnType} from "@mantine/form";
import {useMutation}       from "@tanstack/react-query";

namespace useContactMutation {
    export type Result = boolean;

    export interface Props {
        form: UseFormReturnType<useContactForm.Values>
    }
}

export const useContactMutation = ({form}: useContactMutation.Props) => {
    const axiosClient = useAxiosClient();
    return useMutation({
        mutationFn: async (): Promise<useContactMutation.Result> => {
            const {data} = await axiosClient.post("/contactus", form.values, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            return data;
        }
    })
};