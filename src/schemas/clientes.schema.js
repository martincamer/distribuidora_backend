import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z.string({
    required_error: "Nombre es requerido",
  }),
  apellido: z.string({
    required_error: "Apellido es requerido",
  }),
  email: z.string({
    required_error: "Email es requerido",
  }),
  localidad: z.string({
    required_error: "La localidad requeridA",
  }),
  provincia: z.string({
    required_error: "La provincia es requerida",
  }),
});
