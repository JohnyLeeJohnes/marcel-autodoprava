import classes   from "@/style/Home.module.css";
import {
    Button,
    Container,
    Text,
    Title
}                from "@mantine/core";
import {type FC} from "react"

export const HeroText: FC = () => {
    return (
        <div style={{display: "flex"}}>
            <Container className={classes.wrapper} size={1400}>
                <div className={classes.inner}>
                    <Title className={classes.title}>
                        Autodoprava Marcel Černošek{" "}
                        <Text component="span" className={classes.highlight} inherit>

                        </Text>{" "}

                    </Title>

                    <Container p={0} size={600}>
                        <Text size="lg" c="dimmed" className={classes.description}>

                        </Text>
                    </Container>

                    <div className={classes.controls}>
                        <Button
                            className={classes.control}
                            size="lg"
                            variant="default"
                            color="gray"
                        >
                            Milujeme Denisku
                        </Button>
                        <Button className={classes.control} size="lg">
                            Milujeme Denisku více
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}