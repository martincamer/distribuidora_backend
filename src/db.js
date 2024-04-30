import { connect } from "mongoose";
// import { MONGODB_URI } from "./config";

export async function connectDB() {
  try {
    const connection = await connect(
      "mongodb://localhost:27017/sistema_de_gestion" || process.env.BACKED_URL
    );
    console.log("Conexión a la base de datos establecida");
    return connection.connection.db;
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    throw error; // Lanza el error para que sea manejado por el código que llama a esta función
  }
}
