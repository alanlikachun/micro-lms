import { config } from "./config";
import app from "./app";
import mongoose from "mongoose";

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("Connected MongoDB:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    console.log("Port:", mongoose.connection.port);
    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));
