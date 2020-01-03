import { Router } from "express";
import {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado
} from "../controllers/empleado.controller";

const router = Router();

router.get("/", getEmpleados);
router.get("/:id", getEmpleado);
router.post("/", createEmpleado);
router.put("/:id", updateEmpleado);

export default router;