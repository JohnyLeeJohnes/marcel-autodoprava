import {TooltipedQuestionMark} from "@/lib/ui/TooltipedQuestionMark";
import {
    NumberInput,
    Tooltip
}                              from "@mantine/core";
import {
    ComponentProps,
    type FC
}                              from "react";

export namespace TooltipedNumberInput {
    export interface Props extends ComponentProps<typeof NumberInput> {
        tooltipText: string,
    }
}

export const TooltipedNumberInput: FC<TooltipedNumberInput.Props> = ({tooltipText, ...props}) => {
    return (
        <Tooltip
            multiline
            withArrow
            label={tooltipText}
            position={"right"}
            style={{maxWidth: "30%"}}
            transitionProps={{transition: 'pop-bottom-right'}}
        >
            <NumberInput
                rightSection={<TooltipedQuestionMark text={tooltipText}/>}
                rightSectionWidth={35}
                stepHoldDelay={500}
                stepHoldInterval={100}
                thousandSeparator={","}
                step={1_000}
                {...props}
            />
        </Tooltip>
    );
}