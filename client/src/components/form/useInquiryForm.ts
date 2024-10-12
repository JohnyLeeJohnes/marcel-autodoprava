import {
    InquirySchemaValues,
    schema,
    schemaStep1,
    schemaStep3
}                    from "@/components/form/schemas/inquirySchema";
import {zodResolver} from "@mantine/form";
import {z}           from "zod";

export namespace useInquiryForm {
    export interface Props {
        tr: (text: string) => string;
        active: number;
    }

    export type Values = InquirySchemaValues;
}

export const useInquiryForm = ({tr, active}: useInquiryForm.Props) => {
    return {
        initialValues: {
            csrf_token:    "",
            machines:      [{
                serialNumberNotSpecified: false,
                machineWithAttachment:    false,
                taxDeductible:            "0",
            }] as z.infer<ReturnType<typeof schemaStep1>>["machines"],
            companyData:   {} as z.infer<ReturnType<typeof schemaStep3>>["companyData"],
            contactPerson: {phoneDialCodeCountry: 'de', phoneDialCode: '49'} as z.infer<ReturnType<typeof schemaStep3>>["contactPerson"],
            address:       {} as z.infer<ReturnType<typeof schemaStep3>>["address"],
            postalAddress: {differentPostal: false} as z.infer<ReturnType<typeof schemaStep3>>["postalAddress"],
            tos1:          false,
            tos2:          false,
            tos3:          false,
        },
        validate:      zodResolver(schema({tr, active}) || z.any())
    }
}

export const machineTypes = [
    {label: "Traktor", value: "M1"},
    {label: "Mähdrescher", value: "M2"},
    {label: "Feldhäcksler", value: "M3"},
    {label: "Sonstige Geräte / Maschinen", value: "M4"}
] as const;