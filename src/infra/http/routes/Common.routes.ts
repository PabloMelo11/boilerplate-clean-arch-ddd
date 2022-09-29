import { Response } from '@infra/http/controllers/Controller';
import IHttp from '@infra/http/IHttp';

export default class CommonRoutes {
    constructor(readonly http: IHttp) {
        http.on('get', `/`, {
            async handle(): Promise<Response> {
                return {
                    code: 200,
                    data: 'Boilerplate Authentication 1.0.0',
                };
            },
        });
    }
}
