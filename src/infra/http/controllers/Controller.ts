import { error as libSeidor } from '@seidor-cloud-produtos/lib-seidor-common';

import ValidationError from '@infra/http/errors/ValidationError';

import DomainError from '@domain/entities/errors/DomainError';

export type Request = {
    body: any;
    params: any;
    headers: any;
    query: any;
};

export type Response = {
    code: number;
    data: any;
    docs?: boolean;
};

export default abstract class Controller {
    abstract handle(request: Request): Promise<Response>;

    protected success<T>(dto?: T): Response {
        return {
            code: 200,
            data: { data: dto },
        };
    }

    protected noContent(): Response {
        return {
            code: 204,
            data: undefined,
        };
    }

    protected created(): Response {
        return {
            code: 201,
            data: undefined,
        };
    }

    protected paginatedOrNot<T>(dto?: T): Response {
        return {
            code: 200,
            data: dto,
        };
    }

    protected docs<T>(dto?: T): Response {
        return {
            code: 200,
            data: dto,
            docs: true,
        };
    }

    protected throw(error: Error): Response {
        if (error instanceof DomainError) {
            return {
                code: error.code,
                data: { code: error.code, message: error.message },
            };
        }

        if (error instanceof libSeidor.HttpError) {
            return {
                code: error.code,
                data: { code: error.code, message: error.message },
            };
        }

        if (error instanceof ValidationError) {
            return {
                code: error.code,
                data: {
                    code: error.code,
                    message: error.message,
                    errors: error.errors,
                },
            };
        }

        console.log('Error ->', error);

        return {
            code: 500,
            data: {
                code: 500,
                message: 'Server failed. Contact the administrator!',
            },
        };
    }
}
