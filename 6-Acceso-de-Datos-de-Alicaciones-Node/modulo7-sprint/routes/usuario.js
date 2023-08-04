import { Router } from 'express';
import {
	getUsuarios,
	postUsuario,
	getUsuario,
	putUsuario,
	deleteUsuario,
} from '../controller/usuario.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

export default router;
