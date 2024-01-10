require("dotenv").config();
import ConnectDB from "./DB/index.js";
import { app } from "./app.js";

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("server  listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("something went wrong", err.message);
  });
