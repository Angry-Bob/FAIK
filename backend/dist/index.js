import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.port || 5001;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Your server is open!'));
})
    .catch((e) => console.log(e));
//# sourceMappingURL=index.js.map