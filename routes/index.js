import { Router } from "express";

import imageRouter from "./image.router.js";

const router = Router();

router.use("/image", imageRouter);

export default router;
