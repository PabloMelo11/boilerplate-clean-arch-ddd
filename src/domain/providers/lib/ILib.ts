export default interface ILib {
    throwError(message: string, code: number): Error;
    preparePaginate(size?: string, page?: string): { take: number; skip: number };
    queryPaginated<T, Q>(query: Q | any, dataDB: DataToPaginate<T>): Paginated<T>;
    orderBy(alias: string, param?: string, order?: string): string;
}

type DataToPaginate<T> = {
    data: T[];
    count: number;
};

type Paginated<T> = {
    data: T[];
    count: number;
    limit: number;
    page: number;
    totalPages: number;
};
