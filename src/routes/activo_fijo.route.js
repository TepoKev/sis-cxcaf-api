import { Router } from "express";
import {
    getActivosFijos,
    getActivoFijo,
    createActivoFijo,
    updateactivoFijo,
    getEnums
} from "../controllers/activo_fijo.controller";

const router = Router();

router.get("/", getActivosFijos);
router.get("/enum", getEnums);
router.get("/:id", getActivoFijo);
router.post("/", createActivoFijo);
router.put("/:id", updateactivoFijo);

export default router;