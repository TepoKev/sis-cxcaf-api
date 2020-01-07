import { Router } from "express";
import {
    getProfesiones,
    getProfesion,
    createProfesion,
    updateProfesion
} from "../controllers/profesion.controller";

const router = Router();

router.get("/", getProfesiones);
router.get("/:id", getProfesion);
router.post("/", createProfesion);
router.put("/:id", updateProfesion);

export default router;