import { Router } from "express";
import {
    getProfesions,
    getProfesion,
    createProfesion,
    updateProfesion
} from "../controllers/profesion.controller";

const router = Router();

router.get("/", getProfesions);
router.get("/:id", getProfesion);
router.post("/", createProfesion);
router.put("/:id", updateProfesion);

export default router;