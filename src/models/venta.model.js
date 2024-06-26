import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    tipo: { type: String, default: "" },
    total: { type: Number, default: 0 }, // Valor por defecto
    estado: {
      type: String,
      default: "pendiente",
    },
    productos: {
      type: Array,
      default: [],
    },
    cliente: {
      type: Object,
      default: {},
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

export default mongoose.model("Venta", ventaSchema);
