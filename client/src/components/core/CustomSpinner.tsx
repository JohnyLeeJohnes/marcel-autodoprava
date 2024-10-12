import {customLoader}        from "@/lib/misc/CustomLoader.tsx";
import {LoadingOverlay}      from "@mantine/core";
import {useWindowScroll}     from "@mantine/hooks";
import {useEffect}           from "react";
import {useApplicationStore} from "../store/useApplicationStore";

export default function CustomSpinner() {
    const spinning     = useApplicationStore((state) => state.spinning);
    const [, scrollTo] = useWindowScroll();

    useEffect(() => {
        if (spinning) {
            scrollTo({x: 0, y: 0});
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [spinning]);

    return (
        <LoadingOverlay
            overlayProps={{radius: "sm", blur: 4}}
            loaderProps={{children: customLoader}}
            zIndex={1000}
            visible={false}
        />
    )
}