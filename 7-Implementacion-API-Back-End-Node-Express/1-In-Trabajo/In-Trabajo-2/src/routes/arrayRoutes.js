import { Router } from "express";
import { getArray , getArrays, postArray, putArray } from "../controllers/arrayController.js";
const router = Router();

// Ruta para obtener todos los elementos del array
router.get('/datas', getArrays);

// Ruta para obtener un elemento específico del array por su ID
router.get('/datas/:id', getArray);

// Ruta para agregar un nuevo elemento al array
router.post('/datas', postArray);

// Ruta para actualizar un elemento existente en el array por su ID
router.put('/datas/:id', putArray);

export default router;
