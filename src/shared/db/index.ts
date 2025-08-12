import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';


dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const databaseUrl = isProd ? process.env.PROD_DATABASE_URL : process.env.DEV_DATABASE_URL;

if (!databaseUrl) throw new Error(`Missing ${isProd ? 'PROD_DATABASE_URL' : 'DEV_DATABASE_URL'} environment variable`);

const poolSize = parseInt(process.env.DB_MAX_POOL_SIZE ?? '10', 10);

const isMigratingOrSeeding = Boolean(process.env.DB_MIGRATING || process.env.DB_SEEDING);

export const connection = postgres(databaseUrl, {
    max: isMigratingOrSeeding ? 1 : poolSize,
    onnotice: process.env.DB_SEEDING ? () => { } : undefined,
    idle_timeout: 30_000,
});

export const db = drizzle(connection, {
    schema,
    logger: !isProd,
});

export type db = typeof db;
export default db;
