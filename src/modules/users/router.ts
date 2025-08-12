// routes.ts
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Controller } from './controller';
import { Service } from './service';

async function userRoutes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) {
    const service = new Service();
    const controller = new Controller(service);

    // Public route
    fastify.post('/login', controller.login);

    // Protected route
    fastify.get('/profile', { preHandler: [fastify.authenticate] }, controller.getProfile);
    fastify.get('/', { preHandler: [fastify.authenticate] }, controller.getAllUsers.bind(controller));
}

export default userRoutes;
