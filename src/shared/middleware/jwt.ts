// plugins/jwt.ts
import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jwt from '@fastify/jwt';
import { env } from '../../config/env';

// Extend Fastify and JWT types once at the top level — no duplicates
declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
    interface FastifyRequest {
        jwt: import('@fastify/jwt').FastifyJWT;
    }
    interface FastifyReply {
        jwt: import('@fastify/jwt').FastifyJWT;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { id: string | number; username: string };
        user: { id: string | number; username: string };
    }
}

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(jwt, {
        secret: env.JWT_SECRET,
        sign: { expiresIn: '1h' }
    });

    fastify.decorate(
        'authenticate',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.code(401).send({ error: 'Unauthorized' });
                // Important to throw here or return to prevent further execution
                throw err;
            }
        }
    );
});
