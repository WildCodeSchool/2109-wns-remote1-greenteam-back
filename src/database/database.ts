import mongoose from "mongoose"
import { db_password, db_user } from "../settings"

export async function initConnectDb() : Promise<void> {

    try {
        const init = await mongoose.connect(`mongodb+srv://${db_user}:${db_password}>@clustercollabee.v4ir6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        console.log("connecté à la db")
    }catch (e) {
        console.log(e)
    }
}