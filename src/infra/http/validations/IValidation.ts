export type Request = {
    body?: any;
    params?: any;
    headers?: any;
    query?: any;
};

export type Schema = {
    body?: any;
    params?: any;
    headers?: any;
    query?: any;
};

export default interface IValidation {
    validate(request: Request, schema: Schema): Promise<any>;
}
