export default interface IHttp {
    on(method: string, url: string, callback: any): void;
    listen(port: number): void;
}
