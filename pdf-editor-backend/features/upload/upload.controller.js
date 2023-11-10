import Upload from "./upload.schema.js";
import { PDFDocument } from 'pdf-lib';
export default class UploadController {

    async saveFile(req, res) {
        
        try{
            let existingUpload = await Upload.findOne({ userId: req.body.userId })
            if(existingUpload){
                existingUpload.files.push(req.file.filename);
            }else{
                existingUpload = new Upload({
                    userId: req.body.userId,
                    files: [req.file.fileName],
                });
            }
            await existingUpload.save();
            res.send("success")
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
       
    }

    async parseFile (req,res){
        const existingPdfBytes = req.file.buffer;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        res.end(pdfDoc.getPageCount().toString());
    }

    async extractFile (req,res){
        const existingPdfBytes = req.file.buffer;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        let pagesToRemove = req.body.pagesToRemove.split(',').map(Number);
        if(req.body.pagesToRemove){
            let mark = 1
            pagesToRemove.forEach(p=>{
                pdfDoc.removePage(p-(mark++))
            })
        }
        let pdfBytes = await pdfDoc.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=modified.pdf');
        res.end(pdfBytes);
    }

    async getUserData (req,res){
        Upload.findOne({userId:req.body.userId}).then((user)=>{
            if(user){
                res.send(user);
            }else{
                res.status(404).send("user not founf")
            }
        })
    }

    async deleteFile (req,res) {
        try {
            // Find the document you want to update
            const filter = { userId: req.body.userId };
    
            // Update the document
            const update = { $set: { files: req.body.files } };
    
            const result = await Upload.updateOne(filter, update);
    
            res.send("success")
        } catch (error) {
            res.status(401).send("fail")
            console.error('Error updating document:', error);
        }
    };
}