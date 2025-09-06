import UserRepository from '../repositories/user.repository.js';
import AppError from '../utils/errors/AppError.js';
import MessageRepository from '../repositories/message.repository.js';
import Message from '../models/message.model.js';
import Payment from '../models/payment.model.js';

const userRepo = new UserRepository();
const messageRepo = new MessageRepository();

async function sendMessageService(data) {

  const message = await messageRepo.create(data);

  return message;
}


async function getMessagesService(data) {
  try {
    const { chatRoomId } = data;

    const messages = await Message.find({ chatRoomId }).lean();

    // for (let msg of messages) {
    //   if (msg.isSuper) {
    //     const payment = await Payment.findOne({ messageId: msg._id, status: "succeeded" }).lean();
    //     msg.amount = payment?.amount || 0;
    //     msg.paymentStatus = payment?.status || "unpaid";
    //   } else {
    //     msg.amount = 0;
    //     msg.paymentStatus = null;
    //   }
    // }

    return messages;
  } catch (err) {
    throw err;
  }
};


async function isDoneMessageService(data) {
  try {
    const { messageId, isDone } = data;

    const updatedMessage = await messageRepo.update(messageId, isDone);

    return { id: updatedMessage._id, isDone: updatedMessage.isDone }
  } catch (error) {
    throw error;
  }
}


export { sendMessageService, getMessagesService, isDoneMessageService };