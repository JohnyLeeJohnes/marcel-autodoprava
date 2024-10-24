import {useScrollStore}    from "@/components/store/useScrollStore";
import {
    Paper,
    Text
}                          from "@mantine/core";
import {useScrollIntoView} from "@mantine/hooks";
import {useEffect}         from "react";

export default function Contact() {
    const {scrollIntoView, targetRef} = useScrollIntoView({offset: 60});
    const contactScrollFunction       = useScrollStore((state) => state.contactScrollFunction);

    useEffect(() => {
        contactScrollFunction(scrollIntoView);
    }, []);

    return (
        <Paper p="xl">
            <Text size="xl" c={"blue"} ref={targetRef}>
                Kontakt
            </Text>
        </Paper>
    )
}