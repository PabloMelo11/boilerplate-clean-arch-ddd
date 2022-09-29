type Errors = {
    property: string;
    message: string;
};

type ValidatorError = {
    inner: {
        path: string;
        message: string;
    }[];
};

export default class ValidationError extends Error {
    errors: Errors[];

    code: number;

    constructor(readonly error: ValidatorError) {
        super('Validation Error');
        this.code = 400;
        this.name = 'Validation Error';

        this.errors = this.error.inner.map((err: any) => {
            return { property: err.path, message: err.message };
        });
    }
}
