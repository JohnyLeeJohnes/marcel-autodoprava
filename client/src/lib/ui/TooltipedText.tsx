import {
    Text,
    Tooltip
} from "@mantine/core";
import {
    type FC,
    ReactNode
} from "react";

export namespace TooltipedText {
    export interface Props {
        children?: ReactNode,
        label: string,
        text: string
    }
}

export const TooltipedText: FC<TooltipedText.Props> = ({label, text}) => {
    return (
        <Tooltip
            multiline
            withArrow
            label={label}
            position={"right"}
            style={{maxWidth: "30%"}}
            transitionProps={{transition: 'pop-bottom-right'}}
        >
            <Text size={"sm"}>{text}</Text>
        </Tooltip>
    );
}