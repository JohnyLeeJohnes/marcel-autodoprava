import {HeroText} from "@/components/ui/Home/HeroText";
import {
    Box,
    Space
}                 from "@mantine/core";

export default function Home() {
    return (
        <Box py="md">
            <HeroText/>
            <Space h="xl"/>
        </Box>
    )
}