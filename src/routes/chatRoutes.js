import express from 'express';
import { processChatRequest } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat', processChatRequest);

export default router;
