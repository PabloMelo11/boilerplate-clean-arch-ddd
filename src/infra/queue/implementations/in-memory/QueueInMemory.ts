import IDomainEvent from '@domain/events/IDomainEvent';
import IHandler from '@domain/queue/IHandler';
import IQueue from '@domain/queue/IQueue';

export default class QueueInMemory implements IQueue {
    consumers: IHandler[];

    constructor() {
        this.consumers = [];
    }

    async consume(callbacks: IHandler[]): Promise<void> {
        this.consumers.push(...callbacks);
    }

    async publish(domainEvent: IDomainEvent): Promise<void> {
        for (const consumer of this.consumers) {
            if (consumer.eventName === domainEvent.name) {
                await consumer.handle(domainEvent);
            }
        }
    }
}
