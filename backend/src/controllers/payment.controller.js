
import { createOrderService, verifyOrderService } from '../services/payment.service.js';


async function createOrder(req, res, next) {
    try {
        console.log("create order: ", req.body);
        const order = await createOrderService(req.body);
        console.log("order response", order);
        return res.status(200).json(order);
    } catch (error) {
       
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error,
            data: null
        })
    }
}

async function verifyOrder(req, res, next) {
    try {
        const response = await verifyOrderService(req.body);

        return res.status(200).json(response);
    } catch (error) {
         console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error,
            data: null
        })
    }
}

export { createOrder, verifyOrder }