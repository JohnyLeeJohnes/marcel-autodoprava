import {useTranslator}  from "@/lib/misc/translator";
import classes          from "@/style/Carousel.module.css";
import {Carousel}       from "@mantine/carousel";
import {
    Button,
    Paper,
    Text
}                       from "@mantine/core";
import {IconPlayerPlay} from "@tabler/icons-react";
import {type FC}        from "react";
import {useNavigate}    from "react-router-dom";

export namespace CarouselCard {
    export interface Props {
        image: string;
    }
}

export const CarouselCard: FC<CarouselCard.Props> = ({image}) => {
    const {tr}     = useTranslator();
    const navigate = useNavigate();

    return (
        <Carousel.Slide>
            <Paper
                shadow={"md"}
                p={"xl"}
                style={{backgroundImage: `url(${image})`}}
                className={classes.card}
            >
                <Text
                    mx={"xl"}
                    pt={"100px"}
                    size={"50px"}
                    c={"white"}
                    className={classes.textShadow}
                >
                    {tr("carousel.title")}
                </Text>
                <Button
                    leftSection={<IconPlayerPlay size={30}/>}
                    color={"#367C2B"}
                    mt={"70px"}
                    mx={"xl"}
                    size={"xl"}
                    onClick={() => navigate("/inquiry")}
                >
                    {tr("carousel.button")}
                </Button>
            </Paper>
        </Carousel.Slide>


    );
}