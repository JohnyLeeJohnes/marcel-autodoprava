import {
    createBrowserRouter,
    RouterProvider
}                    from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home          from "./pages/Home";
import NotFound      from "./pages/NotFound";

const router = createBrowserRouter([
        {
            path:     '/',
            element:  <DefaultLayout/>,
            children: [
                {
                    path:    '/',
                    element: <Home/>,
                },
            ]
        },
        {
            path:    '*',
            element: <NotFound/>
        },
    ],
    {
        basename: import.meta.env.VITE_BASE_PATH
    }
)

export function Router() {
    return <RouterProvider router={router}/>;
}
