import IQueue from './IQueue';

export default interface IQueueConnection extends IQueue {
    connect(): Promise<any>;
    close(): Promise<void>;
}
