require('dotenv/config');

module.exports = [
    {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['./src/infra/database/typeorm/entities/*.{ts,js}'],
        synchronize: false,
        migrationsTableName: 'migrations',
        migrations: ['./src/infra/database/typeorm/migrations/*.{ts,js}'],
        cli: {
            migrationsDir: `./src/infra/database/typeorm/migrations`,
        },
    },
];
