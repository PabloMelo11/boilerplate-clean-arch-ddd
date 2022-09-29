/* eslint-disable no-new */
import 'reflect-metadata';
import dotenv from 'dotenv';

import Documentations from '@infra/documentations';
import ExpressAdapter from '@infra/http/adapters/ExpressAdapter';
import Routes from '@infra/http/routes';
import Consumers from '@infra/queue/Consumers';
import QueueKafka from '@infra/queue/implementations/kafka/QueueKafkajs';

import IQueueConnection from '@domain/queue/IQueueConnection';

dotenv.config();

const http = new ExpressAdapter();

(async () => {
    new QueueKafka()
        .getInstance()
        .then((queue: IQueueConnection) => {
            new Consumers(queue);
        })
        .catch(() => console.log('Error to connect queue 💀'))
        .finally(() => {
            new Routes(http);
            new Documentations(http);
        });
})();

http.listen(Number(process.env.PORT) || 3333);
export default http;
