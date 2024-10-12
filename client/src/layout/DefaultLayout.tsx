import {Container}     from "@mantine/core";
import {Outlet}        from "react-router-dom";
import Footer   from "./Footer";
import {Header} from "./Header";

export default function DefaultLayout() {
    return (
        <>
            <Container size={"100vw"} p={0} m={0}>
                <Header/>
                <Outlet/>
                {/*<FetchTranslation/>*/}
            </Container>
            <Footer/>
        </>
    );
}
