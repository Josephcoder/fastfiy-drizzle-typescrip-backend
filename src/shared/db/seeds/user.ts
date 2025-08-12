import type db from "../";
import users from './data/users.json';

import * as schema from "../schema";

export default async function seed(db: db) {
    await db.insert(schema.user).values(users);
}