import logo             from "@/assets/logo.png";
import {ContactUsModal} from "@/components/core/ContactUsModal";
import {useScrollStore} from "@/components/store/useScrollStore";
import {HeaderDrawer}   from "@/layout/HeaderDrawer";
import {
    Button,
    Divider,
    Group,
    Image,
    Paper,
    SimpleGrid
}                       from "@mantine/core";
import {useDisclosure}  from "@mantine/hooks";

import {type FC} from "react";
import classes   from "../style/Header.module.css";

export const Header: FC = () => {
    const [opened, {open, close}] = useDisclosure(false);
    const priceListScrollFunction = useScrollStore((state) => state.priceListScrollFunction);
    const contactScrollFunction = useScrollStore((state) => state.contactScrollFunction);

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
                            variant="subtle"
                            size="md"
                            onClick={() => {
                                priceListScrollFunction({alignment: 'center'});
                            }}
                        >
                            Ceník
                        </Button><Button variant="subtle" size="md">
                        Provozní doba
                    </Button>
                        <Button
                            variant="subtle"
                            size="md"
                            onClick={() => {
                                contactScrollFunction({alignment: 'center'});
                            }}
                        >
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
