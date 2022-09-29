/* eslint-disable */
import { readdirSync } from 'fs';
import { join } from 'path';

export default class Schemas {
    private static instance: Schemas;

    private readonly _schemas: any[] = [];

    private responsePath: string;

    private requestPath: string;

    constructor() {
        this.responsePath = join(
            process.cwd(),
            'dist',
            'infra',
            'documentations',
            'schemas',
            'responses',
        );

        this.requestPath = join(
            process.cwd(),
            'dist',
            'infra',
            'documentations',
            'schemas',
            'requests',
        );

        this.importFilesRequest();
        this.importFilesResponse();
    }

    get schemas() {
        return this._schemas;
    }

    private importFilesResponse() {
        readdirSync(this.responsePath).forEach((file: string) => {
            const Response = require(`${this.responsePath}/${file}`);
            this._schemas.push(Response);
        });
    }

    private importFilesRequest() {
        readdirSync(this.requestPath).forEach((file: string) => {
            const Request = require(`${this.requestPath}/${file}`);
            this._schemas.push(Request);
        });
    }

    getInstance(): Schemas {
        if (!Schemas.instance) {
            Schemas.instance = new Schemas();
        }

        return Schemas.instance;
    }
}
