import express from 'express';
import { sendMail } from '../Controller/MailController.js';

const router = express.Router();
router.post("/sendmail",sendMail);

export default router