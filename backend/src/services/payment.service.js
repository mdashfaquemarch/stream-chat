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
            return {
                message: "amount is required",
                success: false,
                data: null,
                error: null,
            };
        }
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };
        const order = await instance.orders.create(options);
        console.log("order --> ", order);

        return {
            success: true,
            message: "Order created successfully",
            data: order,
            error: null,
        };;
    } catch (error) {
        throw error;
    }
}

async function verifyOrderService(data) {
    try {
        const { order_id, payment_id, signature, amount, message, username, slug, chatRoomId } = data;

        // crate sign

        const sign = order_id + "|" + payment_id;

        // create expectedSign

        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        console.log(expectedSign === signature);

        const isAuthentic = expectedSign === signature;

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
                razorpay_order_id: order_id,
                razorpay_payment_id: payment_id,
                razorpay_signature: signature
            })
            console.log("paid --> ", data);
            // Emit only verified Superchat
            io.to(slug).emit("new-message", data);

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

    }
}

export { createOrderService, verifyOrderService };