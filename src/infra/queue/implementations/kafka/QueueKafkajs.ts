import dotenv from 'dotenv';
import { Kafka, Producer, Consumer, logLevel } from 'kafkajs';

import IDomainEvent from '@domain/events/IDomainEvent';
import IHandler from '@domain/queue/IHandler';
import IQueueConnection from '@domain/queue/IQueueConnection';

dotenv.config();

export default class QueueKafkaJs implements IQueueConnection {
    private static instance: QueueKafkaJs;

    kafkaConnection: Kafka;

    producer: Producer;

    consumer: Consumer;

    private async connectionKafkaClient(): Promise<void> {
        this.kafkaConnection = new Kafka({
            brokers: [
                String(process.env.BROKER_KAFKA_1),
                String(process.env.BROKER_KAFKA_2),
            ],
            clientId: 'supplierauthentication',
            logLevel: logLevel.NOTHING,
            retry: {
                initialRetryTime: 300,
                retries: 2147483647,
            },
        });
    }

    private async connectionProducer(): Promise<void> {
        this.producer = this.kafkaConnection.producer({
            idempotent: true,
        });

        await this.producer.connect();
    }

    private async connectionConsumer(): Promise<void> {
        this.consumer = this.kafkaConnection.consumer({
            groupId: 'supplierauthentication-consumer',
            allowAutoTopicCreation: false,
        });
        await this.consumer.connect();
    }

    async connect(): Promise<QueueKafkaJs> {
        try {
            await this.connectionKafkaClient();
            await this.connectionProducer();
            await this.connectionConsumer();
            console.log('Queue Kafka Connected Broker 🔥 \n');
            return this;
        } catch (err) {
            throw new Error();
        }
    }

    async close(): Promise<void> {
        await this.producer.disconnect();
    }

    async consume(callbacks: IHandler[]): Promise<void> {
        if (!this.kafkaConnection)
            throw new Error('Consumer - Connection kafka not found');

        await Promise.all(
            callbacks.map((callback: any) => {
                console.log(`Connected on topic: [${callback.eventName}]`);
                return this.consumer.subscribe({ topic: callback.eventName });
            }),
        );

        await this.consumer.run({
            async eachMessage({ message, topic }) {
                const handler = callbacks.find(
                    callback => callback.eventName === topic,
                );

                if (handler) {
                    await handler.handle(JSON.parse(message.value!.toString()));
                } else {
                    console.log(`Error for message: ${message.value!.toString()}`);
                }
            },
        });
    }

    async publish(domainEvent: IDomainEvent): Promise<void> {
        if (!this.kafkaConnection)
            throw new Error('Producer - Connection kafka not found');

        await this.producer.send({
            topic: domainEvent.name,
            acks: -1,
            messages: [{ value: JSON.stringify(domainEvent) }],
        });
    }

    async getInstance(): Promise<QueueKafkaJs> {
        if (!QueueKafkaJs.instance) {
            QueueKafkaJs.instance = await new QueueKafkaJs().connect();
        }

        return QueueKafkaJs.instance;
    }
}
