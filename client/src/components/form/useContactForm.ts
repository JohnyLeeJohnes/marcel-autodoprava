import {
    hasLength,
    isEmail,
    isNotEmpty
} from '@mantine/form';

export namespace useContactForm {
    export interface Props {
        tr: (text: string) => string
    }

    export interface Values {
        name: string;
        email: string;
        message: string;
    }
}

export const useContactForm = ({tr}: useContactForm.Props) => {
    return {
        initialValues: {
            name:    "",
            email:   "",
            message: ""
        },
        validate:      {
            name:    hasLength({min: 2}, tr("contactus.validate.name-format")),
            email:   isEmail(tr("contactus.validate.email-format")),
            message: isNotEmpty(tr("contactus.validate.message")),
        }
    }
};