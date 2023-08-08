import { Router } from "express";
import { postImg,getHTML } from "../controllers/imageController.js";

const router = Router();

router.post('/upload', postImg);
router.get('/',getHTML);

export default router;