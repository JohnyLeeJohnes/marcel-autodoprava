import {
    create,
    StoreApi,
    UseBoundStore
} from "zustand";


export interface TBreadcrumb {
    href: string,
    title: string,
}

export interface TBreadcrumbs {
    breadcrumbs?: TBreadcrumb[]
    rightSection?: JSX.Element
}

export interface TBreadcrumbState {
    breadcrumbs: TBreadcrumbs,
    setBreadcrumbs: (data: TBreadcrumbs) => void,
}

export const useBreadcrumbStore: UseBoundStore<StoreApi<TBreadcrumbState>> = create<TBreadcrumbState>(set => ({
    breadcrumbs:    {
        breadcrumbs:  [],
        rightSection: undefined,
    },
    setBreadcrumbs: (data: TBreadcrumbs) => set((): { breadcrumbs: TBreadcrumbs } => ({breadcrumbs: data})),
}));
