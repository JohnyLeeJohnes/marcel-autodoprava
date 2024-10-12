import {schemaStep1} from "@/components/form/schemas/inquirySchema";
import {z}           from "zod";

export const calculatePremium = (machines: z.infer<ReturnType<typeof schemaStep1>>["machines"]) => {
    return machines.map((item) => {
        let price: number;
        if (item.type === "M1") {
            price = item.price * (item.indemnity === "5000" ? 0.00705 : 0.00940);
        } else if (item.type === "M2") {
            price = item.price * (item.indemnity === "5000" ? 0.00900 : 0.01200);
        } else if (item.type === "M3") {
            price = item.price * (item.indemnity === "5000" ? 0.00795 : 0.01060);
        } else {
            price = item.price * (item.indemnity === "5000" ? 0.01035 : 0.01380);
        }
        return price * 1.19;
    }).reduce((prev, next) => prev + next) ?? 0;
}