// imports that allow the use of the app object and the connectToDatabase function.
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// It defines a constant PORT that is set to the value of the environment variable port if it exists, or defaults to 5001 if the environment variable is not set.
const PORT = process.env.port || 5001;
// Returns a promise that should be resolved and allow connection to a database and if not throws an error that will display on the console
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Your server is open!'));
})
    .catch((e) => console.log(e));
//# sourceMappingURL=index.js.map