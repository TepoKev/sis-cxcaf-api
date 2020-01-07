import { Router } from "express";
import {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    getEnumZona,
    getEnumGenero,
    getEnumEstadoCivil,
    getEnumCargo,
    getEnums
} from "../controllers/empleado.controller";

const router = Router();

router.get("/", getEmpleados);
router.get("/enum", getEnums);
router.get("/zona", getEnumZona);
router.get("/genero", getEnumGenero);
router.get("/estadocivil", getEnumEstadoCivil);
router.get("/cargo", getEnumCargo);
router.get("/:id", getEmpleado);
router.post("/", createEmpleado);
router.put("/:id", updateEmpleado);

export default router;