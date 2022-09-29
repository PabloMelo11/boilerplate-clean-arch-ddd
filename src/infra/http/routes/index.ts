/* eslint-disable no-new */
import IHttp from '@infra/http/IHttp';
import CommonRoutes from '@infra/http/routes/Common.routes';

export default class Routes {
    private readonly prefix: string;

    constructor(readonly http: IHttp) {
        this.prefix = '/api';

        new CommonRoutes(http);
    }
}
