//importando el modulo router y el controlador.
import { Router } from 'express';
import { getquienSoy } from '../controllers/quienSoyController.js';

// Crear una instancia del Router de Express.
const router = Router();

// Definir la ruta '/QuienSoy'.
router.get('/QuienSoy', getquienSoy);

// Exportando el router.
export default router;