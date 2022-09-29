export type InputQuery<T> = {
    query: T;
    tenantid: string;
};

export type ResultCountQuery = {
    count: number;
};

export type OutputGetAll<T> = {
    data: T[];
    count?: number;
};
