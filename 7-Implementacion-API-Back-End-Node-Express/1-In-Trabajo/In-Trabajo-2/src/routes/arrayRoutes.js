import { Router } from "express";
import { getArray , getArrays, postArray, putArray } from "../controllers/arrayController.js";
const router = Router();

router.get('/datas', getArrays);

router.get('/datas/:id', getArray);

router.post('/datas', postArray);

router.put('/datas/:id', putArray);

export default router;
