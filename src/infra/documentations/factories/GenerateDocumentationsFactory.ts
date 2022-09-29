import SwaggerJsDoc from '@infra/documentations/adapters/SwaggerJsDoc';

export default function makeGenerateDocumentationsFactory(): any {
    const docs = new SwaggerJsDoc();
    return docs;
}
