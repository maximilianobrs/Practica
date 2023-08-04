import {Router} from 'express';
import { getquienSoy } from '../controllers/quienSoyCtr.js';

const router = Router();

router.get('/QuienSoy', getquienSoy);

export default router;