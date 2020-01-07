import { Router } from "express";
import {
    getClientes,
    getOneCliente,
    createCliente,
    updateCliente,
    getEnums
} from "../controllers/cliente.controller";

const router = Router();

router.get("/", getClientes);
router.get("/enum", getEnums);
router.get("/:id", getOneCliente);
router.post("/", createCliente);
router.put("/:id", updateCliente);

export default router;