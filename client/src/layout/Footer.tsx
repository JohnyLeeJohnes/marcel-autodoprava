import truck             from "@/assets/truck.png";
import classes           from "@/style/Footer.module.css";
import {
    ActionIcon,
    Divider,
    Flex,
    Image,
    Text
}                        from "@mantine/core";
import {IconBrandGoogle} from "@tabler/icons-react";

export default function Footer() {
    const googleUrl = "https://g.co/kgs/FK5j8uU";

    return (
        <nav className={classes.fixedBottom}>
            <Divider/>
            <Flex
                gap={{base: 'sm', sm: 'xl'}}
                justify={{base: "center", sm: "space-between"}}
                align={"center"}
                direction={"row"}
                wrap={"wrap"}
                m={"md"}
            >
                <Image src={truck} h={50}/>
                <Text ta={"center"} mx={"50px"} size={"lg"} c={"dimmed"}>
                    Created by Denisa Černošková&nbsp;&copy;&nbsp;{new Date().getFullYear()}&nbsp;
                </Text>
                <ActionIcon
                    size={"35px"}
                    variant={"light"}
                    c={"blue"}
                    radius={"xl"}
                    onClick={() => window.open(googleUrl, '_blank')}
                >
                    <IconBrandGoogle size={26} stroke={1.5}/>
                </ActionIcon>
            </Flex>
        </nav>
    )
}
