
import { pgTable as table, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const user = table(
    "users",
    {
        id: t.serial().primaryKey(),
        name: t.varchar({ length: 255 }).notNull().unique(),
        staffNumber: t.varchar("staff_number", { length: 12 }).notNull().unique(),
        email: t.varchar({ length: 255 }).notNull().unique(),
        phoneNumber: t.varchar("phone_number", { length: 10 }).notNull().unique(),
        username: t.varchar("username", { length: 255 }).notNull(),
        password: t.varchar(),
        createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow()
    }
);
