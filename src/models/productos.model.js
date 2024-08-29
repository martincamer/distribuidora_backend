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
    tipo: {
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

// Pre-save hook to convert string fields to uppercase
productosSchema.pre("save", function (next) {
  if (this.isModified("codigo")) this.codigo = this.codigo.toUpperCase();
  if (this.isModified("detalle")) this.detalle = this.detalle.toUpperCase();
  if (this.isModified("color")) this.color = this.color.toUpperCase();
  if (this.isModified("categoria"))
    this.categoria = this.categoria.toUpperCase();
  next();
});

export default mongoose.model("Producto", productosSchema);
