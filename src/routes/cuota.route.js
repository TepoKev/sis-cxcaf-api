import { Router } from "express";
import {
    getCuota,
    getCuotas,
    createCuota,
    updateCuota
} from "../controllers/cuota.controller";

const router = Router();

router.get("/", getCuotas);
router.get("/:id", getCuota);
router.post("/", createCuota);
router.put("/:id", updateCuota);

export default router;