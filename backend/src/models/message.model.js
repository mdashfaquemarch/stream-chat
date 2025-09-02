import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom', required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    isSuper: { type: Boolean, default: false },
    paymentAmount: { type: Number, default: 0 },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
