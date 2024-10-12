import {TooltipedQuestionMark} from "@/lib/ui/TooltipedQuestionMark";
import {
    TextInput,
    Tooltip
}                              from "@mantine/core";
import {
    ComponentProps,
    type FC
}                              from "react";

export namespace TooltipedTextInput {
    export interface Props extends ComponentProps<typeof TextInput> {
        tooltipText: string,
    }
}

export const TooltipedTextInput: FC<TooltipedTextInput.Props> = ({tooltipText, ...props}) => {
    return (
        <Tooltip
            multiline
            withArrow
            label={tooltipText}
            position={"right"}
            style={{maxWidth: "30%"}}
            transitionProps={{transition: 'pop-bottom-right'}}
        >
            <TextInput
                rightSection={<TooltipedQuestionMark text={tooltipText}/>}
                {...props}
            />
        </Tooltip>
    );
}