import {Tooltip}          from "@mantine/core";
import {IconQuestionMark} from "@tabler/icons-react";
import {type FC}          from "react";

export namespace QuestinMarkTooltip {
    export interface Props {
        text: string
    }
}

export const TooltipedQuestionMark: FC<QuestinMarkTooltip.Props> = ({text}) => {
    return (
        <Tooltip
            multiline
            withArrow
            label={text}
            position={"right"}
            style={{maxWidth: "30%"}}
            transitionProps={{transition: 'pop-bottom-right'}}
        >
            <IconQuestionMark
                size={16}
                color={"white"}
                style={{
                    background:   "var(--mantine-color-anchor)",
                    borderRadius: "50%",
                    marginRight:  "5px",
                }}
            />
        </Tooltip>
    );
}


