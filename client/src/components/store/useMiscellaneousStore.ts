import {
    create,
    StoreApi,
    UseBoundStore
} from 'zustand';

export interface IInsuranceProduct {
    productName: string;
    productCode: string;
    startDate: number;
    premium?: number;
    tooltip?: string;
}

export interface IInsuranceLob {
    period: number;
    products: IInsuranceProduct[];
}

export interface IInsuranceLobs {
    lobCode: string;
    products: IInsuranceLob[];
}

export interface INameValueData {
    name: string;
    value: string;
}

export interface TMiscellaneousState {
    makeData: INameValueData[] | undefined,
    modelData: INameValueData[] | undefined,
    rimData: INameValueData[] | undefined,
    tyreData: INameValueData[] | undefined,
    productsData: IInsuranceLobs[] | undefined,
    setMakeData: (data: INameValueData[] | undefined) => void,
    setModelData: (data: INameValueData[] | undefined) => void,
    setRimData: (data: INameValueData[] | undefined) => void,
    setTyreData: (data: INameValueData[] | undefined) => void,
    setProductsData: (data: IInsuranceLobs[] | undefined) => void,
};

export const useMiscellaneousStore: UseBoundStore<StoreApi<TMiscellaneousState>> = create<TMiscellaneousState>(set => ({
    makeData:        [],
    modelData:       [],
    rimData:         [],
    tyreData:        [],
    productsData:    [],
    setMakeData:     (data: INameValueData[] | undefined) => set((): { makeData: INameValueData[] | undefined } => ({makeData: data})),
    setModelData:    (data: INameValueData[] | undefined) => set((): { modelData: INameValueData[] | undefined } => ({modelData: data})),
    setRimData:      (data: INameValueData[] | undefined) => set((): { rimData: INameValueData[] | undefined } => ({rimData: data})),
    setTyreData:     (data: INameValueData[] | undefined) => set((): { tyreData: INameValueData[] | undefined } => ({tyreData: data})),
    setProductsData: (data: IInsuranceLobs[] | undefined) => set((): { productsData: IInsuranceLobs[] | undefined } => ({productsData: data})),
}));
