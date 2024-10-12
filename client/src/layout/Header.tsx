import logo             from "@/assets/logo.png";
import {ContactUsModal} from "@/components/core/ContactUsModal";
import {HeaderDrawer}   from "@/layout/HeaderDrawer";
import {useTranslator}  from "@/lib/misc/translator";
import {
    Center,
    Group,
    Image,
    Menu,
    Paper,
    SimpleGrid,
    Text
}                       from "@mantine/core";
import {useDisclosure}  from "@mantine/hooks";
import {
    IconChevronDown,
    IconFileInvoice,
    IconPhone,
    IconQuestionMark
}                       from "@tabler/icons-react";
import {useNavigate}    from "react-router-dom";
import classes          from "../style/Header.module.css";


export function Header() {
    const [opened, {open, close}] = useDisclosure(false);
    const navigate                = useNavigate();
    const {tr}                    = useTranslator();

    return (
        <Paper mx={20} my={20}>
            <ContactUsModal close={close} opened={opened}/>
            <SimpleGrid cols={3} className={classes.hiddenMobile}>
                <Image src={logo} h={60} w={250}/>
                <Center>
                    <Text ta="center" fw={700} size={"md"}>
                        {tr("header.home")}
                    </Text>
                </Center>
                <Group justify={"flex-end"} gap={"lg"}>
                    <Menu
                        trigger={"click-hover"}
                        loop={false}
                        withinPortal={false}
                        trapFocus={false}
                        menuItemTabIndex={0}
                        transitionProps={{exitDuration: 0}}
                        shadow={"md"}
                        width={230}
                    >
                        <Menu.Target>
                            <Center style={{cursor: "pointer"}}>
                                <Text mr={"2px"} fw={700}>{tr("menu.title")}</Text>
                                <IconChevronDown size={"20px"} stroke={1.5}/>
                            </Center>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconQuestionMark size={"20px"}/>}
                                onClick={() => navigate("/faq")}
                            >
                                <Text className={classes.navigationAnchor}>{tr("menu.faq")}</Text>
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconFileInvoice size={"20px"}/>}
                                onClick={() => navigate("/what-is-insured")}
                            >
                                <Text className={classes.navigationAnchor}>{tr("menu.what-is-insured")}</Text>
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconPhone size={"20px"}/>}
                                onClick={() => open()}
                            >
                                <Text className={classes.navigationAnchor}>{tr("menu.contact")}</Text>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </SimpleGrid>
            <HeaderDrawer openModal={open}/>
        </Paper>
    );
}
