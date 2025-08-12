import { FastifyReply, FastifyRequest } from 'fastify';
import { Service } from './service';
import { StatusCodes } from 'http-status-codes';
import exclude from '../../shared/utils/exclude';

export class Controller {
    constructor(private service: Service) { }


    login = async (request: FastifyRequest, reply: FastifyReply) => {
        const { username, password } = request.body as { username: string; password: string };
        const user = await this.service.validateUser(username, password);

        if (!user) {
            return reply.status(401).send({ error: 'Invalid username or password' });
        }

        const token = await reply.jwtSign({ id: user.id, username: user.username });
        return reply.send({ token });
    };

    getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = (request.user as any).id;
        const user = await this.service.getUserById(userId);

        if (!user) {
            return reply.status(404).send({ error: 'User not found' });
        }

        // Exclude password before returning profile
        return reply.send(exclude(user, ["password"]));
    };

    getAllUsers = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        const users = await this.service.getAllUsers();
        reply.status(StatusCodes.OK).send(users);
    };
}
