import compress from "@fastify/compress";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import Fastify from "fastify";
import multipart from 'fastify-multipart';
import apiRoutes from "./modules/routes";
import jwtPlugin from './shared/middleware/jwt';
import { registerErrorHandler } from "./shared/utils/error-handler";

export function buildApp() {
    const app = Fastify({
        logger: {
            transport: {
                target: "pino-pretty",
                options: { colorize: true, translateTime: "SYS:standard" }
            }
        }
    });
    app.register(cors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    });
    app.register(helmet);
    app.register(compress);
    app.register(jwtPlugin);
    app.register(multipart);

    app.register(apiRoutes, { prefix: "/api" });

    registerErrorHandler(app);

    return app;
}
