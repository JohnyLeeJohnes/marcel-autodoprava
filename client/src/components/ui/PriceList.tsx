import {
    Paper,
    Text
}                          from "@mantine/core";
import {useScrollIntoView} from "@mantine/hooks";
import {useEffect}         from "react";
import {useScrollStore}    from "../store/useScrollStore";

export default function PriceList() {
    const {scrollIntoView, targetRef} = useScrollIntoView({offset: 60});
    const priceListScrollFunction     = useScrollStore((state) => state.priceListScrollFunction);

    useEffect(() => {
        priceListScrollFunction(scrollIntoView);
    }, []);

    return (
        <Paper p="xl">
            <Text
                size="xl"
                c={"blue"}
                ref={targetRef}
            >
                Ceník
            </Text>
        </Paper>
    )
}