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
    imagen: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    categoria: {
      type: String,
      default: "",
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
