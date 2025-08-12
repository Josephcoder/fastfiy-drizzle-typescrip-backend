import { FastifyInstance } from "fastify";
import { logger } from "./logger";

export function registerErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error, request, reply) => {
        logger.error(error);

        reply.status(error.statusCode || 500).send({
            statusCode: error.statusCode || 500,
            message: error.message || "Internal Server Error"
        });
    });
}
