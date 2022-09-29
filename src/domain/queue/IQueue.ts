import IDomainEvent from '@domain/events/IDomainEvent';
import IHandler from '@domain/queue/IHandler';

export default interface IQueue {
    consume(callback: IHandler[]): Promise<void>;
    publish(domainEvent: IDomainEvent): Promise<void>;
}
