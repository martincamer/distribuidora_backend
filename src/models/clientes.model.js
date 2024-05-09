import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      default: "",
    },
    apellido: {
      type: String,
      required: true,
      default: "",
    },
    localidad: {
      type: String,
      default: "",
    },
    provincia: {
      type: String,
      default: "",
    },
    dni: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    telefono: {
      type: Number,
      default: "",
    },
    total: { type: Number, default: 0 }, // Valor por defecto
    comprobantes: {
      type: Array,
      default: [],
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
