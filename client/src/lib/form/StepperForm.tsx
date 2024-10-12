import {useInquiryForm}    from "@/components/form/useInquiryForm";
import {useTranslator}     from "@/lib/misc/translator";
import {
    Alert,
    Box,
    Stepper
}                          from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {IconInfoCircle}    from "@tabler/icons-react";
import {
    Dispatch,
    type FC,
    SetStateAction
}                          from "react";
import {ISteps}            from "./stepper";
import {StepperNavigation} from "./StepperNavigation";

export namespace StepperForm {
    export interface Props {
        errors: string[];
        setErrors: Dispatch<SetStateAction<string[]>>;
        active: number;
        setActive: Dispatch<SetStateAction<number>>;
        formSteps: ISteps[];
        nextStep: () => void;
        prevStep: () => void;
        submitForm: () => void;
        form: UseFormReturnType<useInquiryForm.Values>;
        FormStepCompleted: FC<{ form: any }>;
    }
}

export const StepperForm: FC<StepperForm.Props> = ({
    errors,
    setErrors,
    active,
    setActive,
    formSteps,
    nextStep,
    prevStep,
    submitForm,
    form,
    FormStepCompleted,
}) => {
    const {tr} = useTranslator();

    return (
        <Box style={{maxWidth: 1250}} mx={"xl"} my={"sm"}>
            {errors.map((item: string, index: number) => (
                <Alert
                    key={index}
                    variant={"light"}
                    color={"red"}
                    radius={"md"}
                    withCloseButton
                    mb={"lg"}
                    title={item}
                    icon={<IconInfoCircle/>}
                    onClose={() => setErrors(errors.filter((_, i) => i !== index))}
                />
            ))}
            <form>
                <Stepper active={active} onStepClick={setActive} mt={"50px"}>
                    {formSteps.map((item, index) => (
                        <Stepper.Step
                            key={item.label + index}
                            label={tr(item.label)}
                            description={tr(item.description)}
                            allowStepSelect={active > index}
                        >
                            <Box mt={"md"}>
                                <item.component form={form}/>
                            </Box>
                        </Stepper.Step>
                    ))}
                    <Stepper.Completed>
                        <Box mt={"md"}>
                            <FormStepCompleted form={form}/>
                        </Box>
                    </Stepper.Completed>
                </Stepper>
                {active !== 1 && <StepperNavigation
                    active={active}
                    steps={formSteps}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    submitForm={submitForm}
                />}
            </form>
        </Box>
    )
}