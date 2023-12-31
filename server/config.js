import { config } from "dotenv";

config();

//Puerto servidor
export const PORT = process.env.PORT || 3000;
//Credenciales base de datos
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || "adminProyect";
export const DB_PASSWORD = process.env.DB_PASSWORD || "adminProyect";
export const DB_DATABASE = process.env.DB_DATABASE || "schedule";