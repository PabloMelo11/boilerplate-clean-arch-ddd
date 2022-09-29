import dotenv from 'dotenv';
import { join } from 'path';
import { createConnections, Connection } from 'typeorm';

dotenv.config();

export default async (): Promise<Connection[]> => {
    return createConnections([
        {
            name: 'default',
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT!,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            migrations: [join(__dirname, 'migrations/*.{ts,js}')],
            cli: {
                migrationsDir: `${join(__dirname, 'migrations')}`,
            },
            entities: [join(__dirname, 'entities/*.{ts,js}')],
        },
    ]);
};
