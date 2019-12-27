import { Router } from "express";
import { getClientes, getOneCliente, createCliente } from "../controllers/cliente.controller";

const router = Router();

router.get("/", getClientes);
router.get("/:id", getOneCliente);
router.post("/", createCliente);

export default router;