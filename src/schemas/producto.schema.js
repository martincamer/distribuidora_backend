import { z } from "zod"; // Para definir esquemas y validar

export const createProductoSchema = z.object({
  codigo: z.string({
    required_error: "Codigo es requerido",
  }),
  detalle: z.string({
    required_error: "Detalle es requerido",
  }),
  color: z.string({
    required_error: "Color es requerido",
  }),
  categoria: z.string({
    required_error: "Categoria es requerida",
  }),
  kg_barra_estimado: z.string({
    required_error: "El kg de la barra es requerido",
  }),
});
