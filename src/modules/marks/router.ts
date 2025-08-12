// routes.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Controller } from './controller';
import { Service } from './service';
import { logger } from '../../shared/utils/logger';

async function marksRoutes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) {
    const service = new Service();
    const controller = new Controller(service);

    // Public route
    // Protected route
    fastify.get('/report-card', () => {
        logger.info("failed")
    });
}

export default marksRoutes;
