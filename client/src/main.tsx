import {
    createTheme,
    MantineProvider
}               from '@mantine/core';
import React    from 'react';
import ReactDOM from 'react-dom/client';
import App      from "./App";

const theme = createTheme({
    fontFamily: 'Inter',
    cursorType: 'pointer',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <App/>
        </MantineProvider>
    </React.StrictMode>,
)
