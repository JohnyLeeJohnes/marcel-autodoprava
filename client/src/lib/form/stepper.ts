import {Inquiry} from "@/pages/Inquiry/Inquiry";
import {FC}      from "react";

export interface ISteps {
    label: string;
    description: string;
    component: FC<Inquiry.StepProps>;
}