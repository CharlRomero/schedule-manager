import express from "express";
import morgan from "morgan";
import cors from "cors";

import courseRoute from "./routes/course.routes.js";

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/", courseRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
