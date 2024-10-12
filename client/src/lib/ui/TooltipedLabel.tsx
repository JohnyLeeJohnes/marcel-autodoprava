import {Group}                 from "@mantine/core"
import {type FC}               from "react";
import {TooltipedQuestionMark} from "./TooltipedQuestionMark.tsx";

export namespace TooltipedLabel {
    export interface Props {
        tooltip: string
        text: string
    }
}

export const TooltipedLabel: FC<TooltipedLabel.Props> = ({tooltip, text}) => {
    return (
        <Group justify={"space-between"}>
            {text}
            <TooltipedQuestionMark text={tooltip}/>
        </Group>
    );
}