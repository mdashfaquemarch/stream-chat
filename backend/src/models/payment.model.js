import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    username: {
       type: String,
       required: true
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["succeeded", "failed", "pending"],
      default: "pending",
    },
    date: { type: Date, default: Date.now },
    razorpay_order_id: {
      type:String,
      required: true
    },
    razorpay_payment_id: {
      type:String,
      required: true
    },
    razorpay_signature: {
      type:String,
      required: true
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
