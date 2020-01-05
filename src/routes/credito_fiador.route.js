import { Router } from "express";
import {
    getCreditosFiadores,
    getCreditoFiador,
    createCreditoFiador,
    updateCreditoFiador
} from "../controllers/credito_fiador.controller";

const router = Router();

router.get("/", getCreditosFiadores);
router.get("/:id", getCreditoFiador);
router.post("/", createCreditoFiador);
router.put("/:id", updateCreditoFiador);

export default router;