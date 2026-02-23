import express from 'express';
import multer from 'multer';
import { GetData, Uploadfile } from '../Controller/BcaController.js';
import BcaMiddleware from '../Middleware/BcaMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload",upload.single("file"),BcaMiddleware("admin"), Uploadfile);
router.get("/create",GetData)

export default router;
