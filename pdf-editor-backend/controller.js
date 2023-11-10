import { PDFDocument } from 'pdf-lib';

export default class Controller {
    async upload(res, req) {
        const existingPdfBytes = req.file.buffer;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        res.end(pdfDoc.getPageCount().toString());
    }
}