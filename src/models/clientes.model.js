import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    localidad: {
      type: String,
      required: true,
    },
    provincia: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
    },
    email: {
      type: String,
    },
    telefono: {
      type: Number,
    },
    total: { type: Number, default: 0 }, // Valor por defecto
    comprobantes: {
      type: Array,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cliente", clientesSchema);
