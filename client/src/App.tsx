import '@mantine/core/styles.css';
import './style/App.css';
import {Notifications}    from "@mantine/notifications";
import {
    QueryClient,
    QueryClientProvider
}                         from "@tanstack/react-query";
import i18next            from "i18next";
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.layer.css';
import '@mantine/carousel/styles.css';
import 'mantine-datatable/styles.layer.css';
import {initReactI18next} from 'react-i18next';
import {
    NextStepProvider,
    PrevStepProvider
}                         from "./components/context";
import CustomSpinner      from "./components/core/CustomSpinner";
import {fallbackLanguage} from './lib/misc/translator';
import {Router}           from "./Router";

i18next
    .use(initReactI18next)
    .init({
        lng:           fallbackLanguage,
        debug:         false,
        interpolation: {
            escapeValue: false
        },
    }).then(() => {
});

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Notifications position={"top-center"} zIndex={2077}/>
            <NextStepProvider>
                <PrevStepProvider>
                    <CustomSpinner/>
                    <Router/>
                </PrevStepProvider>
            </NextStepProvider>
        </QueryClientProvider>
    )
}