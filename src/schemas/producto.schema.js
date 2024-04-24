import { z } from "zod";

export const createProductoSchema = z.object({
  codigo: z.string({
    required_error: "Codigo es requerido",
  }),
  // detalle: z.string().optional(),
  // color: z.string().optional(),
  // categoria: z.string().optional(),
  // kg_barra_estimado: z.text().optional(),
  // stock: z.text().optional(),
  // stock_minimo: z.tex().optional(),
  // stock_maximo: z.text().optional(),
  // date: z.string().datetime().optional(),
});
