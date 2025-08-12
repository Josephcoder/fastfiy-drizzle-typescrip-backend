import PDFDocument from 'pdfkit';
import { Student } from './types';

export class Service {

    getReportCard(students: Student[], stream: NodeJS.WritableStream): void {
        const doc = new PDFDocument({ autoFirstPage: false });
        doc.pipe(stream);

        for (const student of students) {
            doc.addPage();
            doc.fontSize(20).text(`Report Card for ${student.name}`, { underline: true });
            doc.moveDown();
            doc.fontSize(14).text(`Class: ${student.class}`);
            doc.text(`Marks: ${student.marks}`);
        }

        doc.end();
    }

}
