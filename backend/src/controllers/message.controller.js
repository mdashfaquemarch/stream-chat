import { getMessagesService, sendMessageService } from "../services/message.service.js";



async function sendMessage(req, res, next) {
    try {
        const response = await sendMessageService();

        return res.status(200).json({
            message: "messages send successfully",
            success: true,
            data: response,
            error: null
        })
    } catch (error) {
        console.log(error);
    }
}


async function getMessages(req, res, next) {
    try {
        const response = await getMessagesService(req.body);
        return res.status(200).json({
            message: 'messages fetched successfully',
            success: true,
            data: response,
            error: null
        })
    } catch (error) {
        console.log(error);
    }
}


export {sendMessage, getMessages};