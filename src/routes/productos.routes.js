import { Router } from "express";
import {
  createProductos,
  deleteProductos,
  getProducto,
  getProductos,
  updateProductos,
} from "../controllers/productos.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/productos", auth, getProductos);

router.post("/productos", auth, createProductos);

router.get("/productos/:id", auth, getProducto);

router.put("/productos/:id", auth, updateProductos);

router.delete("/productos/:id", auth, deleteProductos);

export default router;
