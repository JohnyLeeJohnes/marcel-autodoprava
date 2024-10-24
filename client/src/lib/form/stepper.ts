import {FC}      from "react";

export interface ISteps {
    label: string;
    description: string;
    component: FC<any>;
}