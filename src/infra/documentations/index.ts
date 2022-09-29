import makeGenerateDocumentationsFactory from '@infra/documentations/factories/GenerateDocumentationsFactory';
import IHttp from '@infra/http/IHttp';

export default class Documentations {
    constructor(readonly http: IHttp) {
        this.http.on('get', '/api-docs', makeGenerateDocumentationsFactory());
    }
}
