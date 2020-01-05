import { Router } from "express";
import {
    getMarcas,
    getMarca,
    createMarca,
    updateMarca
} from "../controllers/marca.controller";

const router = Router();

router.get("/", getMarcas);
router.get("/:id", getMarca);
router.post("/", createMarca);
router.put("/:id", updateMarca);

export default router;