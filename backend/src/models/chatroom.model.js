import mongoose from "mongoose";


const chatRoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {  // Public chatroom URL (e.g., /chatroom/some-title)
        type: String,
        required: true,
        unique: true
    },
    roomExpiry: {
        type: Date,
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isLive: { type: Boolean, default: true }
}, { timestamps: true });



const Chatroom = mongoose.model("Chatroom", chatRoomSchema);

export default Chatroom;