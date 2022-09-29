import 'express-async-errors';
import cors from 'cors';
import express, { Request, Response } from 'express';

import Controller from '@infra/http/controllers/Controller';
import IHttp from '@infra/http/IHttp';

export default class ExpressAdapter implements IHttp {
    private app: any;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: false }));
    }

    private parseUrl(url: string) {
        return url.replace(/\{/g, ':').replace(/\}/g, '');
    }

    on(method: string, url: string, callback: Controller): void {
        this.app[method](this.parseUrl(url), async (req: Request, res: Response) => {
            const requestData = {
                body: req.body,
                params: req.params,
                headers: req.headers,
                query: req.query,
            };
            const output = await callback.handle(requestData);
            if (output.docs) {
                res.status(output.code || 200).send(output.data);
            } else {
                res.status(output.code || 200).json(output.data);
            }
        });
    }

    listen(port: number): void {
        this.app.listen(port, () =>
            console.log(`Server is running on PORT ${port} 🔥`),
        );
    }
}
