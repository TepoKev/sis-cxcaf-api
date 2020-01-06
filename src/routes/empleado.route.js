import { Router } from "express";
import {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    getEnumZona,
    getEnumGenero,
    getEnumEstadoCivil,
    getEnumCargo
} from "../controllers/empleado.controller";

const router = Router();

router.get("/", getEmpleados);
router.get("/zona", getEnumZona);
router.get("/genero", getEnumGenero);
router.get("/estadocivil", getEnumEstadoCivil);
router.get("/cargo", getEnumCargo);
router.get("/:id", getEmpleado);
router.post("/", createEmpleado);
router.put("/:id", updateEmpleado);

export default router;