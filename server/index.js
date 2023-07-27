import app from "./app.js";
import { PORT } from "./config.js";

//Settings
app.set("port", PORT);

//Starting server
app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(`Server on port: ${app.get("port")}`);
});

