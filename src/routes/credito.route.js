import { Router } from "express";
import {
    getCreditos,
    getCredito,
    createCredito,
    updateCredito,
    getEnums
} from "../controllers/credito.controller";

const router = Router();

router.get("/", getCreditos);
router.get("/enum", getEnums);
router.get("/:id", getCredito);
router.post("/", createCredito);
router.put("/:id", updateCredito);

export default router;