import { Router } from "express";
import {
    getTiposActivo,
    getTipoActivo,
    createTipoActivo,
    updateTipoActivo
} from "../controllers/tipo_activo.controller";

const router = Router();

router.get("/", getTiposActivo);
router.get("/:id", getTipoActivo);
router.post("/", createTipoActivo);
router.put("/:id", updateTipoActivo);

export default router;