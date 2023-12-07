import { connect, disconnect } from "mongoose";

// Function to connect to the MongoDB database
async function connectToDatabase() {
    try {
        // Attempt to establish a connection
        await connect(process.env.MONGODB_URL)
    } catch (e) {
        // Log the error and throw a custom error message if the connection fails
        console.log(e)
        throw new Error('No connection to MongoDB')
    }
}
// Function to disconnect from the MongoDB database
async function disconnectFromDatabase() {
    try {
        // Attempt to disconnect from the MongoDB database
        await disconnect()
    } catch(e) {
        // Log the error and throw a custom error message if disconnection fails
        console.log(e)
        throw new Error('Cannot disconnect from MongoDB, please try again.')
    }
}

export  { connectToDatabase, disconnectFromDatabase }