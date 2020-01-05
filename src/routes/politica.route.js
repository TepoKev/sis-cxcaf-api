import { Router } from "express";
import {
    getPoliticas,
    getPolitica,
    createPolitica,
    updatePolitica
} from "../controllers/politica.controller";

const router = Router();

router.get("/", getPoliticas);
router.get("/:id", getPolitica);
router.post("/", createPolitica);
router.put("/:id", updatePolitica);

export default router;