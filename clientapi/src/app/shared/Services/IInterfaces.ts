export interface DataCase {
    id: number;
    caseName: string;
    caseBrand?: any;
    productLink: string;
    cost: number;
    type: string;
    l: number;
    w: number;
    h: number;
    volume: number;
    footprint: number;
    storage: string;
    psuType: string;
    gpuLength: number;
    expansionSlots: number;
    coolerHeight: number;
    fanSupport: string;
    radiatorSupport: string;
    comments: string;
}

export interface ICase {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    sortColumn?: any;
    sortOrder?: any;
    filterColumn?: any;
    filterQuery?: any;
    pricemin?: any;
    pricemax: number;
    gpuLengthMin: number;
    gpuLengthMax: number;
    volumeMin: number;
    volumeMax: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    data: DataCase[];
}





export interface brandinfo {
    id: number;
    name: string;
    founder: string;
    founded: Date;
    ceo: string;
    headquarters?: any;
}

export interface brandtot {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    filterColumn?: any;
    filterQuery?: any;
    data: brandinfo[];
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
