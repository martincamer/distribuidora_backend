import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imagen_usuario: {
      type: String,
      default: "",
    },
    imagen_facturacion: {
      type: String,
      default: "",
    },
    dni_facturacion: {
      type: String,
      default: "",
    },
    telefono_facturacion: {
      type: String,
      default: "",
    },
    email_facturacion: {
      type: String,
      default: "",
    },
    email_facturacion: {
      type: String,
      default: "",
    },
    localidad_facturacion: {
      type: String,
      default: "",
    },
    provincia_facturacion: {
      type: String,
      default: "",
    },
    cuenta: {
      type: String,
      default: "activada",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
