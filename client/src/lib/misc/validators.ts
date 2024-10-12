import moment from "moment";

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validatePhone = (phone: string) => {
    return String(phone).toLowerCase().match('[0-9]{9}');
}

export const formatToUTCDate = (value: Date | null): Date | null => {
    if (value) {
        return moment.utc(pad(value.getFullYear()) + '-' + pad(value.getMonth() + 1) + '-' + pad(value.getDate())).toDate();
    }
    return null;
}

export const numberFormat = (number: number, locale: string = 'en-GB', precition: number = 2) => {
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: precition,
        minimumFractionDigits: precition
    }).format(number);
}

export const currencyFormat = (number: number, locale: string = 'de-DE', currency: string = 'EUR', precition: number = 2) => {
    return new Intl.NumberFormat(locale, {
        style:                 'currency',
        currency:              currency,
        maximumFractionDigits: precition
    }).format(number);
}

const pad = (n: number): number | string => {
    return n < 10 ? '0' + n : n
}