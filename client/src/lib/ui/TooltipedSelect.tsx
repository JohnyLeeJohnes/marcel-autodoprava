import {TooltipedQuestionMark} from "@/lib/ui/TooltipedQuestionMark";
import {
    Select,
    Tooltip
}                              from "@mantine/core";
import {
    ComponentProps,
    type FC
}                              from "react";

export namespace SelectTooltiped {
    export interface Props extends ComponentProps<typeof Select> {
        tooltipText: string,
    }
}

export const TooltipedSelect: FC<SelectTooltiped.Props> = ({tooltipText, ...props}) => {
    return (
        <Tooltip
            multiline
            withArrow
            label={tooltipText}
            position={"right"}
            style={{maxWidth: "30%"}}
            transitionProps={{transition: 'pop-bottom-right'}}
        >
            <Select
                rightSection={<TooltipedQuestionMark text={tooltipText}/>}
                {...props}
            />
        </Tooltip>
    );
}