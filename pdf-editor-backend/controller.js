import { PDFDocument } from 'pdf-lib';

export default class Controller {
    async upload(res, req) {
        const existingPdfBytes = req.file.buffer;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        console.log("something count" , pdfDoc.getPageCount())
        res.end(pdfDoc.getPageCount().toString());
    }
}