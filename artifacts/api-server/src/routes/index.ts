import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import productLinksRouter from "./product-links";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(productLinksRouter);

export default router;
