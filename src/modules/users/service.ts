import { eq } from "drizzle-orm";
import db from "../../shared/db";
import * as schema from "../../shared/db/schema";
import { comparePassword } from "../../shared/utils/password";

export class Service {
    async validateUser(username: string, password: string) {
        // Fetch user by username
        const user = await db.query.user.findFirst({
            where: eq(schema.user.username, username),
        });
        if (!user) return null;

        // Compare hashed password
        const isValid = await comparePassword(password, user.password!);
        if (!isValid) return null;

        return user;
    }

    async getUserById(id: number) {
        return await db.query.user.findFirst({
            where: eq(schema.user.id, id)
        });
    }
    async getAllUsers() {
        return await db.select().from(schema.user);
    }

}
