import { Router } from "express";
import * as controller from "../controller/image.controller.js";

const router = Router();

router.post("/generate", controller.generate);

export default router;
