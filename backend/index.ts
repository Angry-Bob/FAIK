import app from "./server.js";
import { connectToDatabase } from "./db/index.js";


const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Connected to server")
    );
  })
  .catch((err) => console.log(err));