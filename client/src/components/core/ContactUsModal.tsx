import {useContactMutation}  from "@/components/api/post/useContactMutation";
import {useMutationResult}   from "@/lib/hooks/useMutationResult";
import {useTranslator}       from "@/lib/misc/translator";
import {
    Anchor,
    Button,
    Divider,
    Group,
    Modal,
    SimpleGrid,
    Text,
    Textarea,
    TextInput
}                            from "@mantine/core";
import {useForm}             from "@mantine/form";
import {showNotification}    from "@mantine/notifications";
import {
    IconCheck,
    IconX
}                            from "@tabler/icons-react";
import {type FC}             from "react";
import {useContactForm}      from "../form/useContactForm";
import {useApplicationStore} from "../store/useApplicationStore";

export namespace ContactUsModal {
    export interface Props {
        close: () => void;
        opened: boolean;
    }
}

export const ContactUsModal: FC<ContactUsModal.Props> = ({close, opened}) => {
    const {tr}            = useTranslator();
    const form            = useForm<useContactForm.Values>(useContactForm({tr}));
    const contactMutation = useContactMutation({form: form})
    const setSpinning     = useApplicationStore((state) => state.setSpinning);

    useMutationResult({
        result:     contactMutation,
        onFetching: () => setSpinning(true),
        onSettled:  () => setSpinning(false),
        onError:    () => showNotification({
            title:     tr("notification.error.header"),
            message:   tr("notification.error.body-contactus"),
            icon:      <IconX/>,
            color:     'red',
            autoClose: 5000,
        }),
        onSuccess:  async (data) => {
            if (data) {
                showNotification({
                    title:     tr("notification.success.header"),
                    message:   tr("notification.success.body-contactus"),
                    icon:      <IconCheck/>,
                    color:     'teal',
                    autoClose: 3500,
                });
                close();
            }
        }
    });

    return (
        <Modal
            centered
            size={"xl"}
            opened={opened}
            onClose={close}
            title={
                <Text size={"xl"} fw={700}>
                    {tr("contactus.title")}
                </Text>
            }
        >
            <Divider mb={"sm"}/>
            <form onSubmit={form.onSubmit(async () => {
                if (form.isValid()) {
                    contactMutation.mutate();
                }
            })}>
                <SimpleGrid cols={2}>
                    <TextInput
                        label={tr("contactus.name.label")}
                        placeholder={tr("contactus.name.placeholder") as string}
                        maxLength={60}
                        name={"name"}
                        variant={"filled"}
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label={tr("contactus.email.label")}
                        placeholder={tr("contactus.email.placeholder") as string}
                        maxLength={60}
                        name={"email"}
                        variant={"filled"}
                        {...form.getInputProps("email")}
                    />
                </SimpleGrid>
                <Textarea
                    label={tr("contactus.message.label")}
                    placeholder={tr("contactus.message.placeholder") as string}
                    name={"message"}
                    maxRows={10}
                    minRows={5}
                    autosize
                    mt={"md"}
                    variant={"filled"}
                    {...form.getInputProps("message")}
                />
                <Text mt={"md"} size={"sm"}>
                    Oder rufen Sie uns an unter <Anchor href={"tel:+49 (0) 69867906281"}>+49 (0) 69867906281</Anchor>.
                </Text>
                <Text size={"sm"}>
                    Unser Kundenserviceteam ist von Montag bis Freitag von 9 bis 17 Uhr für Sie da, um Ihnen bei Fragen oder Anliegen behilflich zu
                    sein.
                </Text>
                <Group justify="center" mt="xl">
                    <Button type="submit" size="md" className={"marshButton"}>
                        {tr("contactus.button.send")}
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
