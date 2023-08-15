import { Router } from 'express';
import { getToken, verificarToken } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getToken);
router.post('/', verificarToken);

export default router;
