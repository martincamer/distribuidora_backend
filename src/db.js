// import { connect } from "mongoose";

// export async function connectDB() {
//   try {
//     const connection = await connect(
//       // "mongodb://localhost:27017/sistema_de_gestion"
//       "mongodb://127.0.0.1:27017/sistema_de_gestion"
//       // "mongodb://mongo:ewvsSdQRijYrJpFkYnCIbviEobUslioo@monorail.proxy.rlwy.net:59925"
//     );
//     console.log("Conexión a la base de datos establecida");
//     return connection.connection.db;
//   } catch (error) {
//     console.error("Error al conectar a la base de datos", error);
//     throw error; // Lanza el error para que sea manejado por el código que llama a esta función
//   }
// }

import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

export async function connectDB() {
  if (!MONGO_URL) {
    throw new Error("Please add the MONGO_URL environment variable");
  }

  mongoose.connect(MONGO_URL);

  const database = mongoose.connection;

  database.on(
    "error",
    console.error.bind(console, "❌ mongodb connection error")
  );

  database.once("open", () => console.log("✅ mongodb connected successfully"));
}
