import { Router } from "express";
import usersRouter from "./users_api.js";
import productsRouter from "./products_api.js";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);

export default router;
