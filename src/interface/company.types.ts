export interface ICompany {
    id: number;
    name: string;
    title: string;
    slug: string;
    image: string;
    imageUrl: string;
    featured: boolean;
}

export interface ICompanyResponse {
    status: string;
    data: {
        items: ICompany[];
        total: number;
        pageNumber: number;
        limit: number;
        totalPages: number;
    };
}

export interface ICompanyPaginationParams {
    pageNumber?: number;
    limit?: number;
}
