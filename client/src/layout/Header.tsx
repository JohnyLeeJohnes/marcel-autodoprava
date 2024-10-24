import logo                                               from "@/assets/logo.png";
import {ContactUsModal}                                   from "@/components/core/ContactUsModal";
import {HeaderDrawer}                                     from "@/layout/HeaderDrawer";
import {useTranslator}                                    from "@/lib/misc/translator";
import {Button, Divider, Group, Image, Paper, SimpleGrid} from "@mantine/core";
import {useDisclosure, useScrollIntoView}                 from "@mantine/hooks";
import {useNavigate}                                      from "react-router-dom";
import classes                                            from "../style/Header.module.css";
import React                                              from "react";


export function Header() {
    const [opened, {open, close}]     = useDisclosure(false);
    const navigate                    = useNavigate();
    const {tr}                        = useTranslator();
    const {scrollIntoView, targetRef} = useScrollIntoView();

    return (
        <>
            <Paper mx={20} my={20}>
                <ContactUsModal close={close} opened={opened}/>
                <SimpleGrid cols={2} className={classes.hiddenMobile}>
                    <Image src={logo} h={60} w={250}/>
                    <Group justify={"flex-end"} gap={"lg"}>
                        <Button variant="subtle" size="md">
                            Úvod
                        </Button>
                        <Button variant="subtle" size="md">
                            O nás
                        </Button>
                        <Button
                            onClick={() => {
                                scrollIntoView({alignment: "center"})
                            }}
                            variant="subtle"
                            size="md"
                        >
                            Ceník
                        </Button><Button variant="subtle" size="md">
                        Provozní doba
                    </Button>
                        <Button variant="subtle" size="md">
                            Kontakt
                        </Button>
                    </Group>
                </SimpleGrid>
                <HeaderDrawer openModal={open}/>
            </Paper>
            <Divider my="md"/>
        </>
    );
}
