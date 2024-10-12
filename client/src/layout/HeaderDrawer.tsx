import {useTranslator}  from "@/lib/misc/translator";
import classes          from "@/style/Header.module.css";
import {
    Burger,
    Button,
    Divider,
    Drawer,
    Flex
}                       from "@mantine/core";
import {useDisclosure}  from "@mantine/hooks";
import {
    IconFileInvoice,
    IconPhone,
    IconQuestionMark
}                       from "@tabler/icons-react";
import {type FC}        from "react";
import {useNavigate}    from "react-router-dom";

export namespace HeaderDrawer {
    export interface Props {
        openModal: () => void
    }
}

export const HeaderDrawer: FC<HeaderDrawer.Props> = ({openModal}) => {
    const [drawerOpened, {
        toggle: toggleDrawer,
        close:  closeDrawer
    }]             = useDisclosure(false);
    const {tr}     = useTranslator();
    const navigate = useNavigate();

    return (
        <>
            <Flex
                mih={50}
                gap="md"
                justify="space-between"
                align="space-between"
                direction="row"
                wrap="wrap"
                className={classes.hiddenDesktop}
            >
                <Burger
                    opened={drawerOpened}
                    onClick={toggleDrawer}
                />
            </Flex>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                withCloseButton={true}
                className={classes.hiddenDesktop}
                padding={"md"}
                position={"right"}
                zIndex={1000000}
            >
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="nowrap"
                    style={{cursor: "pointer"}}
                    onClick={() => {
                        closeDrawer();
                        navigate("/")
                    }}
                >
                    asd
                </Flex>
                <Divider my="md"/>
                <Button
                    className={classes.navigationButton}
                    onClick={() => navigate("/faq")}
                    leftSection={<IconQuestionMark size={"20px"}/>}
                >
                    {tr("header.faq")}
                </Button>
                <Button
                    className={classes.navigationButton}
                    onClick={() => navigate("/what-is-insured")}
                    leftSection={<IconFileInvoice size={"20px"}/>}
                >
                    {tr("header.whatIsInsured")}
                </Button>
                <Button
                    className={classes.navigationButton}
                    leftSection={<IconPhone size={"20px"}/>}
                    onClick={() => {
                        toggleDrawer();
                        openModal();
                    }}
                >
                    {tr("header.contact")}
                </Button>
            </Drawer>
        </>
    );
}