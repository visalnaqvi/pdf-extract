import express from "express"
import UploadController from "./upload.controller.js";
import multer from 'multer';
const uploadRouter = express.Router();
const uploadController = new UploadController;
  
const upload = multer({storage:multer.memoryStorage()})


const diskUpload = multer({
  storage: multer.diskStorage({
      destination: './files',
      filename: (req, file, cb) => {
          cb(null, file.originalname); // Use the original filename
      },
  })
});
uploadRouter.post('/parse' ,  upload.single('pdfFile'), uploadController.parseFile )

uploadRouter.post('/extract' ,  upload.single('pdfFile'),uploadController.extractFile)

uploadRouter.post('/save' ,diskUpload.single('pdfFile') , uploadController.saveFile)

uploadRouter.post("/user-data" , uploadController.getUserData)

uploadRouter.post("/delete-file" , uploadController.deleteFile)

export default uploadRouter;