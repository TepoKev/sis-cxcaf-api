import { Router } from "express";
import {
    getFiador,
    getFiadores,
    createFiador,
    updateFiador
} from "../controllers/fiador.controller";

const router = Router();

router.get("/", getFiadores);
router.get("/:id", getFiador);
router.post("/", createFiador);
router.put("/:id", updateFiador);

export default router;