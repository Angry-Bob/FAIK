import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (e) {
        console.log(e)
        throw new Error('No connection to MongoDB')
    }

}

async function disconnectFromDatabase() {
    try {
        await disconnect()
    } catch(e) {
        console.log(e)
        throw new Error('Cannot disconnect from MongoDB, please try again.')
    }
}