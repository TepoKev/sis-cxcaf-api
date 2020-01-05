import { Router } from "express";
import {
    getActivosFijosBajas,
    getActivoFijoBaja,
    createActivoFijoBaja,
    updateActivoFijoBaja
} from "../controllers/activo_fijo_baja.controller";

const router = Router();

router.get("/", getActivosFijosBajas);
router.get("/:id", getActivoFijoBaja);
router.post("/", createActivoFijoBaja);
router.put("/:id", updateActivoFijoBaja);

export default router;