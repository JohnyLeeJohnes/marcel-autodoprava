import {useInquiryForm}    from "@/components/form/useInquiryForm";
import {useAxiosClient}    from "@/lib/misc/axios-client";
import {UseFormReturnType} from "@mantine/form";
import {useMutation}       from "@tanstack/react-query";

export namespace useInquiryMutation {
    export type Result = {
        id?: string
    };

    export interface Props {
        form: UseFormReturnType<useInquiryForm.Values>
    }
}

export const useInquiryMutation = ({form}: useInquiryMutation.Props) => {
    const axiosClient = useAxiosClient();
    return useMutation({
        mutationFn: async (): Promise<useInquiryMutation.Result> => {
            const {data} = await axiosClient.post("/inquiry/register", form.values, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            return data;
        }
    })
};