import {IconArrowBackUp, IconBriefcase, IconFileCertificate, IconRefresh, IconReport, IconTrendingUp} from "@tabler/icons-react";

export interface IProduct {
    title: string
    link: string,
    description: string,
    icon: typeof IconRefresh,
    tag?: string,
}

export interface IFooterRoute {
    link: string,
    label: string,
}

export interface ILanguage {
    label: string,
    locale: string,
    countryCode: string,
    msatCookieCode: string,
}

export const products: IProduct[] = [
    {
        title: "products.layertwo.title",
        description: "products.layertwo.description",
        link: "/products/layertwo",
        icon: IconFileCertificate,
    },
    {
        title: "products.withdrawal.title",
        link: "/products/withdrawal",
        description: "products.withdrawal.description",
        icon: IconArrowBackUp,
    },
    {
        title: "products.project.title",
        link: "/products/project",
        description: "products.project.description",
        icon: IconBriefcase,
    },
    {
        title: "products.maintenance.title",
        link: "/products/maintenance",
        description: "products.maintenance.description",
        icon: IconReport,
    },
    {
        title: "products.renewal.title",
        link: "https://marshsat.com/cz",
        description: "products.renewal.description",
        icon: IconRefresh,
        tag: "products.internal",
    },
    {
        title: "products.limit-increase.title",
        link: "https://marshsat.com/cz",
        description: "products.limit-increase.description",
        icon: IconTrendingUp,
        tag: "products.internal",
    },
];

export const footerRoutes: IFooterRoute[] = [
    {
        link: "/insurances",
        label: "footer.menu.insurances"
    },
    {
        link: "/documents",
        label: "footer.menu.documents"
    },
];

export const languages = (): ILanguage[] => {
    let languages: ILanguage[] = [
        {
            label: 'Czech',
            locale: 'cs-CZ',
            countryCode: 'cz',
            msatCookieCode: 'cs',
        },
        {
            label: 'English',
            locale: 'en-GB',
            countryCode: "gb",
            msatCookieCode: "en",
        },
    ];
    if (process.env.NODE_ENV === "development") {
        languages.push({
            label: 'Show translations',
            locale: '-',
            countryCode: '-',
            msatCookieCode: '-',
        });
    }
    return languages;
}

export const allowedFileUploadExtensions: string[] = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];