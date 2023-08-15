import express from "express";
import morgan from "morgan";
import cors from "cors";

import courseRoute from "./routes/course.routes.js";
import subjectRoute from "./routes/subject.routes.js";
import slotRoute from "./routes/slot.routes.js";
import periodRoute from "./routes/period.routes.js";
import educationYearRoute from "./routes/educationyear.routes.js";
import educationTypeRoute from "./routes/educationtype.routes.js";
import roomRoute from "./routes/room.routes.js";

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

//Rutas
app.use("/", courseRoute);
app.use("/", subjectRoute);
app.use("/", slotRoute);
app.use("/", periodRoute);
app.use("/", educationYearRoute);
app.use("/", educationTypeRoute);
app.use("/", roomRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
