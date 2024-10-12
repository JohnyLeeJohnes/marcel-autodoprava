import {
    Box,
    Container,
    Paper
}                    from "@mantine/core";
import {MantineSize} from "@mantine/core/lib/core";
import {
    FC,
    ReactNode
}                    from "react";

export namespace StepWrapper {
    export interface Props {
        children?: ReactNode
        size?: MantineSize
        mt?: "sm" | "md" | "lg" | "xl"
    }
}

export const StepWrapper: FC<StepWrapper.Props> = ({children, size}) => {
    return (
        <Container
            px={"xs"}
            py={"lg"}
            mt={"lg"}
            size={size ? size : "xl"}
        >
            <Paper
                p={"sm"}
                mt={"sm"}
                shadow={"xs"}
                radius={"md"}
                withBorder
            >
                <Box style={{
                    backgroundColor: "var(--mantine-color-gray-0)",
                    padding:         "var(--mantine-spacing-sm)",
                    borderRadius:    "var(--mantine-radius-md"
                }}>
                    {children}
                </Box>
            </Paper>
        </Container>
    )
}