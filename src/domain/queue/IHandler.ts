export default interface IHandler {
    eventName: string;
    handle(message: any): Promise<void>;
}
