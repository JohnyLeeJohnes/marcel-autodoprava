import {useNextStepContext} from "@/components/context";
import {ISteps}             from "@/lib/form/stepper";
import {
    Button,
    Group
}                           from "@mantine/core";
import {useWindowScroll}    from "@mantine/hooks";
import {FC}                 from "react";
import {useTranslator}      from "../misc/translator";

export namespace StepperNavigation {
    export interface Props {
        active: number,
        nextStep: () => void,
        prevStep: () => void,
        submitForm: () => void,
        steps: ISteps[];
    }
}

export const StepperNavigation: FC<StepperNavigation.Props> = ({
    active,
    nextStep,
    prevStep,
    submitForm,
    steps
}) => {
    const {tr}           = useTranslator();
    const {nextDisabled} = useNextStepContext();
    const [, scrollTo]   = useWindowScroll();


    return (
        <Group justify="center" mt={"xl"} mb={"md"}>
            {active !== 0 &&
                <Button variant="default" onClick={() => {
                    prevStep();
                    scrollTo({x: 0, y: 0});
                }}>
                    {tr("button.back")}
                </Button>}
            {active === steps.length ?
                (<Button onClick={submitForm}>
                    {tr("button.submit")}
                </Button>) :
                (<Button onClick={() => {
                    nextStep();
                    scrollTo({x: 0, y: 0});
                }} disabled={nextDisabled || active === steps.length}>
                    {tr("button.next")}
                </Button>)}
        </Group>
    )
}