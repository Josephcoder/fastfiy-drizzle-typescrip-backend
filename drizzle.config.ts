import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

export default defineConfig({
    schema: "./src/shared/db/schema",
    out: "./src/shared/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL
    }
});
