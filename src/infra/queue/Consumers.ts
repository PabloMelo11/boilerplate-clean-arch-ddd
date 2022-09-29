import IQueueConnection from '@domain/queue/IQueueConnection';

export default class Consumers {
    constructor(private readonly queue: IQueueConnection) {
        this.runQueue();
    }

    async runQueue(): Promise<void> {
        this.queue.consume([]);
    }
}
