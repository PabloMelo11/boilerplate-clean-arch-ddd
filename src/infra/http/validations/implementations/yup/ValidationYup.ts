import * as yup from 'yup';

import ValidationError from '@infra/http/errors/ValidationError';
import IValidation, { Request, Schema } from '@infra/http/validations/IValidation';

export default class ValidationYup implements IValidation {
    private async validateSchema<T>(
        data: T,
        schema: yup.ObjectSchema<
            yup.Shape<Record<string, unknown> | undefined, Record<string, unknown>>,
            Record<string, unknown>
        >,
    ): Promise<void> {
        try {
            await schema.validate(data, { abortEarly: false, stripUnknown: true });
        } catch (err) {
            throw new ValidationError(err);
        }
    }

    async validate(request: Request, schema: Schema): Promise<any> {
        if (schema.headers)
            return this.validateSchema(request.headers, schema.headers);
        if (schema.query) return this.validateSchema(request.query, schema.query);
        if (schema.body) return this.validateSchema(request.body, schema.body);
        if (schema.params) return this.validateSchema(request.params, schema.params);
    }
}
