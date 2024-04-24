import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    kg_barra_estimado: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    stock_minimo: {
      type: Number,
      required: true,
    },
    stock_maximo: {
      type: Number,
      required: true,
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

export default mongoose.model("Producto", productosSchema);
