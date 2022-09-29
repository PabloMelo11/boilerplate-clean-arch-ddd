/* eslint-disable no-new */
import 'reflect-metadata';
import dotenv from 'dotenv';

import Documentations from '@infra/documentations';
import ExpressAdapter from '@infra/http/adapters/ExpressAdapter';
import Routes from '@infra/http/routes';

dotenv.config();

const http = new ExpressAdapter();

(async () => {
    new Routes(http);
    new Documentations(http);
})();

http.listen(Number(process.env.PORT) || 3333);
export default http;
