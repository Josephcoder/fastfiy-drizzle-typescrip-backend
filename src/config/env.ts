import { config } from "dotenv";
import { expand } from "dotenv-expand";

import { ZodError, z } from "zod";

const stringBoolean = z.coerce.string().transform((val) => {
    return val === "true";
}).default(false);

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(4000),
    JWT_SECRET: z.string(),
    DEV_DATABASE_URL: z.string(),
    PROD_DATABASE_URL: z.string(),
    DATABASE_URL: z.string(),
    DB_MIGRATING: stringBoolean,
    DB_SEEDING: stringBoolean,
});

export type envSchema = z.infer<typeof envSchema>;

expand(config());

try {
    envSchema.parse(process.env);
} catch (error) {
    if (error instanceof ZodError) {
        let message = "Missing required values in .env:\n";
        error.issues.forEach((issue) => {
            message += String(issue.path[0]) + "\n";
        });
        const e = new Error(message);
        e.stack = "";
        throw e;
    } else {
        console.error(error);
    }
}
export const env = envSchema.parse(process.env);

