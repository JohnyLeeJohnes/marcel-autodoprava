import {useInquiryForm} from "@/components/form/useInquiryForm";
import {z}              from "zod";

export type InquirySchemaValues = { csrf_token: string } &
                                  z.infer<ReturnType<typeof schemaStep1>> &
                                  z.infer<ReturnType<typeof schemaStep3>> &
                                  z.infer<ReturnType<typeof schemaStep4>>;

export const schemaStep1 = (tr: any) => z.object({
    machines: z.array(
        z.object({
            type:               z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            make:               z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            indemnity:          z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            manufactureYear:    z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            usedOrNew:          z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            taxDeductible:      z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            price:              z.number({message: tr("error.empty")}).nonnegative({message: tr("error.nonnegative")}),
            leasingNumber:      z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            insuranceStartDate: z.date({message: tr("error.empty")}),
        }).and(z.discriminatedUnion("serialNumberNotSpecified", [
            z.object({serialNumberNotSpecified: z.literal(true)}),
            z.object({
                serialNumberNotSpecified: z.literal(false),
                serialNumber:             z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            })
        ])).and(z.discriminatedUnion("machineWithAttachment", [
            z.object({
                machineWithAttachment: z.literal(false),
                model:                 z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            }),
            z.object({
                machineWithAttachment: z.literal(true),
                modelsOfAttachments:   z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            })
        ]))
    )
});

export const schemaStep3 = (tr: any) => z.object({
    companyData:   z.object({
        name:  z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
        legal: z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
    }),
    contactPerson: z.object({
        title:                z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
        firstname:            z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
        lastname:             z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
        email:                z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
        phone:                z.number({message: tr("error.number")}),
        phoneDialCode:        z.string(),
        phoneDialCodeCountry: z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
    }),
    address:       z.object({
        street:      z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
        houseNumber: z.number({message: tr("error.number")}),
        zipCode:     z.number({message: tr("error.empty")}),
        city:        z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
    })
}).and(z.object({
    postalAddress: z.discriminatedUnion("differentPostal", [
        z.object({differentPostal: z.literal(false)}),
        z.object({
            differentPostal: z.literal(true),
            street:          z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
            houseNumber:     z.number({message: tr("error.number")}),
            zipCode:         z.number({message: tr("error.number")}),
            city:            z.string({required_error: tr("error.empty")}).trim().min(1, {message: tr("error.empty")}),
        })
    ])
}))

export const schemaStep4 = (tr: any) => z.object({
    tos1: z.boolean().refine((value) => value, {message: tr("error.boolean")}),
    tos2: z.boolean().refine((value) => value, {message: tr("error.boolean")}),
    tos3: z.boolean().refine((value) => value, {message: tr("error.boolean")}),
});

export const schema = ({tr, active}: useInquiryForm.Props) => ({
    0: schemaStep1(tr),
    2: schemaStep3(tr),
    3: schemaStep4(tr),
})[active];