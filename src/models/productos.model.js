import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      default: "",
    },
    detalle: {
      type: String,
      required: true,
      default: "",
    },
    imagen: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      required: true,
      default: "",
    },
    categoria: {
      type: String,
      required: true,
      default: "",
    },
    kg_barra_estimado: {
      type: String,
      required: true,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    stock_minimo: {
      type: Number,
      default: 0,
    },
    stock_maximo: {
      type: Number,
      default: 0,
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
