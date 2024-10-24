import {Home}      from "@/pages/Home";
import {Container} from "@mantine/core";
import Footer      from "./Footer";
import {Header}    from "./Header";

export default function DefaultLayout() {


    return (
        <>
            <Container size={"100vw"} p={0} m={0}>
                <Header/>
                <Home/>
            </Container>
            <Footer/>
        </>
    );
}
