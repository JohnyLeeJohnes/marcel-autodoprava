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
                        Automated AI{" "}
                        <Text component="span" className={classes.highlight} inherit>
                            code reviews
                        </Text>{" "}
                        for any stack
                    </Title>

                    <Container p={0} size={600}>
                        <Text size="lg" c="dimmed" className={classes.description}>
                            Build more reliable software with AI companion. AI is also trained
                            to detect lazy developers who do nothing and just complain on
                            Twitter.
                        </Text>
                    </Container>

                    <div className={classes.controls}>
                        <Button
                            className={classes.control}
                            size="lg"
                            variant="default"
                            color="gray"
                        >
                            Book a demo
                        </Button>
                        <Button className={classes.control} size="lg">
                            Purchase a license
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}