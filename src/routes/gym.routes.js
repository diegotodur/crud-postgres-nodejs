import { Router } from "express";
import {
    crearEjercicio,
    obtenerEjercicios,
    actualizarEjercicio,
    eliminarEjercicio
} from "../controllers/gym.controller.js";

const router = Router();
  
router.post("/ejercicios", crearEjercicio);
router.get("/ejercicios", obtenerEjercicios);
router.put("/ejercicios", actualizarEjercicio);
router.delete("/ejercicios", eliminarEjercicio);
  
export default router;
  