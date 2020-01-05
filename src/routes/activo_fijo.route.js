import { Router } from "express";
import {
    getActivosFijos,
    getActivoFijo,
    createActivoFijo,
    updateactivoFijo
} from "../controllers/activo_fijo.controller";

const router = Router();

router.get("/", getActivosFijos);
router.get("/:id", getActivoFijo);
router.post("/", createActivoFijo);
router.put("/:id", updateactivoFijo);

export default router;