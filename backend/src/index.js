import dotenv from 'dotenv';
import { app } from "./app.js";
import { Config } from './config/server-config.js';
import { connectDB } from './config/database-config.js';


dotenv.config({
    path: "./.env"
})



connectDB().then(() => {
    app.listen(Config.PORT, () => {
        console.log(`Server is running At PORT: ${Config.PORT}`);
    })
})

