import { Router } from 'express';
import {
	getTransferencias,
	postTransferencia,
} from '../controller/transferencia.js';

const router = Router();

router.get('/', getTransferencias);
router.post('/', postTransferencia);

export default router;
