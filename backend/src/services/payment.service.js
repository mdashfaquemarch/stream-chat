import PaymentRepository from "../repositories/payment.repository.js";
import MessageRepo from '../repositories/message.repository.js'
import Razorpay from 'razorpay'
import crypto from 'crypto'

import { Config } from '../config/server-config.js';
import { io } from "../app.js";

const paymentRepo = new PaymentRepository();
const messageRepo = new MessageRepo();

let instance = new Razorpay({
    key_id: Config.RAZORPAY_KEY_ID,
    key_secret: Config.RAZORPAY_KEY_SECRET,
});

async function createOrderService(data) {
    try {
        const { amount } = data;
        const numericAmount = Number(amount);
        if (amount === null || amount === undefined || isNaN(numericAmount) || numericAmount <= 0
        ) {
            return res.status(400).json({
                message: "amount is required",
                success: false,
                data: null,
                error: null,
            });
        }
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        const order = await instance.orders.create(options);

        return order;
    } catch (error) {
        throw error;
    }
}

async function verifyOrderService(data) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, message, username, slug, chatRoomId } = data;

        // crate sign

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // create expectedSign

        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        console.log(expectedSign === razorpay_signature);

        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {

           
            //  do work here for database
            // creating db messages ------->
            const data = await messageRepo.create({
                chatRoomId: chatRoomId,
                username: username,
                message: message,
                isSuper: true,
                paymentAmount: amount
            })

            // 
            const payment = await paymentRepo.create({
                messageId: data._id,
                username: username,
                amount: amount,
                status: "succeeded",
                razorpay_order_id: razorpay_order_id,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature
            })

             // Emit only verified Superchat
            io.to(slug).emit("new-message", {
                type: "superchat",
                name,
                message,
                amount
            });

            return {
                success: true,
                message: "Payment has been verified",
                data: null,
                error: null,
            };
        } else {
            return {
                success: false,
                message: "Invalid signature",
                data: null,
                error: null,
            };
        }
    } catch (error) {
        throw error;
         res.status(500).json({ error: "Verification failed" });
    }
}

export { createOrderService, verifyOrderService };
