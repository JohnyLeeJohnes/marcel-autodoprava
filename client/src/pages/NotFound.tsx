import {
    Button,
    Container,
    Group,
    Text,
    Title
}                    from "@mantine/core";
import {useNavigate} from "react-router-dom";
import classes       from '../style/NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container className={classes.root}>
            <Group justify={"center"}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title
                            className={classes.title}
                            mb={"sm"}
                        >
                            404 - Page not found
                        </Title>
                        <Text
                            className={classes.description}
                            c={"dimmed"}
                            size={"lg"}
                            my={"sm"}
                        >
                            Page you are trying to open does not exist. You may have mistyped
                            the address, or the page has been moved to another URL.
                        </Text>

                        <Button
                            onClick={() => navigate("/")}
                            size={"lg"}
                            my={"sm"}
                        >
                            Take me Home
                        </Button>
                    </div>
                </div>
            </Group>
        </Container>
    );
}
