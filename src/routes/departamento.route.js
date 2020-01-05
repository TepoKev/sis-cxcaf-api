import { Router } from "express";
import {
    getDepartamento,
    getDepartamentos,
    createDepartamento,
    updateDepartamento
} from "../controllers/departamento.controller";

const router = Router();

router.get("/", getDepartamentos);
router.get("/:id", getDepartamento);
router.post("/", createDepartamento);
router.put("/:id", updateDepartamento);

export default router;