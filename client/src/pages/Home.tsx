import {HeroText}                                            from "@/components/ui/Home/HeroText";
import {AspectRatio, Container, Divider, Paper, Space, Text} from "@mantine/core";
import React                                                 from "react";

export default function Home() {
    return (
        <Container py="md" size={1200}>
            <HeroText/>
            <Divider my="md"/>
            <Paper p="xl">
                <Text size="xl" c={"blue"}>
                    Kde nás najdete
                </Text>
            </Paper>
            <div style={{width: "700px"}}>
                <AspectRatio ratio={16 / 9}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-74.04668908358428!3d40.68924937933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty%20National%20Monument!5e0!3m2!1sen!2sru!4v1644262070010!5m2!1sen!2sru"
                        title="Google map"
                        style={{border: 0}}
                    />
                </AspectRatio>
            </div>
            <Divider my="md"/>
            <Paper p="xl">
                <Text ref={} size="xl" c={"blue"}>
                    Ceník
                </Text>
            </Paper>
            <Divider my="md"/>
            <Paper p="xl">
                <Text size="xl" c={"blue"}>
                    Provozní doba
                </Text>
            </Paper>
            <Divider my="md"/>
            <Paper p="xl">
                <Text size="xl" c={"blue"}>
                    Kontakt
                </Text>
            </Paper>
            <Paper p="xl">
                <Text>
                    Marcel Černošek
                    730 183 144
                    776 667 892
                </Text>
            </Paper>
            <Space h="xl"/>
        </Container>
    )
}