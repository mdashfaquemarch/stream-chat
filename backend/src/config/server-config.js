import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})

const _config = {
    PORT: process.env.PORT || 5000,
    MONGODB_DEV_URL: process.env.MONGODB_DEV_URL,
    MONGODB_PROD_URL: process.env.MONGODB_PROD_URL,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    BASE_URL: process.env.BASE_URL,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    
}

const Config = Object.freeze(_config);

export {Config}