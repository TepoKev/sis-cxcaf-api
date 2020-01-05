import { Router } from "express";
import {
    getGarantias,
    getGarantia,
    createGarantia,
    updateGarantia
} from "../controllers/garantia.controller";

const router = Router();

router.get("/", getGarantias);
router.get("/:id", getGarantia);
router.post("/", createGarantia);
router.put("/:id", updateGarantia);

export default router;