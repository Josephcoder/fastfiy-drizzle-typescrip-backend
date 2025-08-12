import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import userRoutes from '../users/router';
import marksRoutes from '../marks/router';

async function apiRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(userRoutes, { prefix: '/users' });
    fastify.register(marksRoutes, { prefix: '/marks' });

}

export default apiRoutes;
