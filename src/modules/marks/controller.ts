import { FastifyReply, FastifyRequest } from 'fastify';
import { Service } from './service';
import { Student } from './types';
import { logger } from '../../shared/utils/logger';

export class Controller {
    constructor(private service: Service) { }

    async getReportCardHandler(req: FastifyRequest, reply: FastifyReply) {
        // Replace this with real data fetching logic
        const students: Student[] = [
            { name: 'Alice', class: 'Grade 1', marks: 85 },
            { name: 'Bob', class: 'Grade 1', marks: 90 },
            { name: 'Charlie', class: 'Grade 2', marks: 78 },
        ];
        reply.header('Content-Type', 'application/pdf');
        reply.header('Content-Disposition', 'attachment; filename=report_cards.pdf');

        this.service.getReportCard(students, reply.raw);
    }
};