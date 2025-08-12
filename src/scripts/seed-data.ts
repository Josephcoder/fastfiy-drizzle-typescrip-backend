import { Table, getTableName, sql } from "drizzle-orm";
import { env } from '../config/env';
import { db, connection } from '../shared/db';
import * as schema from "../shared/db/schema";
import * as seeds from '../shared/db/seeds';

if (!env.DB_SEEDING) {
    throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
    return db.execute(
        sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
    );
}
(async () => {
    for (const table of [schema.user]) {
        await resetTable(db, table);
    }

    await seeds.user(db);

    await connection.end();
})();
