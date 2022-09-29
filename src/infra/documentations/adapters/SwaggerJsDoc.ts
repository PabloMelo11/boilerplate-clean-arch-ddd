import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';

import Schemas from '@infra/documentations/schemas';
import Controller from '@infra/http/controllers/Controller';

export default class SwaggerJsDoc extends Controller {
    handle(): any {
        const swaggerDefinition: SwaggerDefinition = {
            info: {
                title: 'API Supplier Authentication Service',
                description: 'This is the service routes documentation',
                version: '1.0.0',
            },
            host: process.env.HOST || 'http://localhost:3000',
            basePath: '/',
            license: {
                name: 'Seidor Brasil - Orbit',
            },
            servers: [
                {
                    url: 'https://dev.api.orbitspot.com/supplierauthenticationservice',
                    description: `Docs server development`,
                },
                {
                    url: 'https://hom.api.orbitspot.com/supplierauthenticationservice',
                    description: `Docs server homolog`,
                },
                {
                    url: 'https://api.orbitspot.com/supplierauthenticationservice',
                    description: `Docs server production`,
                },
            ],
            tags: [
                {
                    name: 'Unauthenticated routes',
                    description: 'APIs related to unauthenticated routes',
                },
                {
                    name: 'Suppliers',
                    description: 'APIs related to suppliers',
                },
                {
                    name: 'Delivery Mail',
                    description: 'APIs related to delivery mail',
                },
            ],
        };

        const swagger = swaggerJSDoc({
            swaggerDefinition,
            apis: ['./dist/infra/documentations/routes/index.js'],
        }) as SwaggerDefinition;

        const { schemas } = new Schemas().getInstance();

        schemas.forEach(schema => {
            swagger.definitions = {
                ...swagger.definitions,
                ...schema,
            };
        });

        return this.docs(swagger);
    }
}
