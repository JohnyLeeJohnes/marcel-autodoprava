import {
    Anchor,
    Box,
    Breadcrumbs,
    Group
}                    from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {
    TBreadcrumb,
    useBreadcrumbStore
}                    from "../store/useBreadcrumbStore";

export default function CustomBreadcrumbs() {
    const navigate    = useNavigate();
    const breadcrumbs = useBreadcrumbStore((state) => state.breadcrumbs);

    return (
        <Group justify={"space-between"}>
            <Box mx={"lg"}>
                <Breadcrumbs>
                    {breadcrumbs?.breadcrumbs?.map((item: TBreadcrumb, index: number) => (
                        <Anchor
                            key={index}
                            onClick={() => navigate(item.href)}
                        >
                            {item.title}
                        </Anchor>
                    ))}
                </Breadcrumbs>
            </Box>
            <Box mx={"lg"}>
                {breadcrumbs?.rightSection}
            </Box>
        </Group>
    )
}