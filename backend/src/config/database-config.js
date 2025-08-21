import mongoose from "mongoose";
import { Config } from "./server-config.js";
import { DB_NAME } from "./constants-config.js";

const connectDB = async () => {
    try {
       if (Config.NODE_ENV === 'development') {

             await mongoose.connect(Config.MONGODB_DEV_URL);
           }
       
           if (Config.NODE_ENV === 'production') {
             await mongoose.connect(Config.MONGODB_PROD_URL);
           }
        console.log(`⚡⚡ MONGODB CONNECTED SUCCESSFULLY ⚡⚡`)
    } catch (error) {
        console.log(`💀💀 MONGODB CONNECTION ERROR : 💀💀`, error);
        process.exit(1);
    }
}

export {connectDB};