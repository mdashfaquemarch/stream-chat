import { isDoneMessageService, sendMessageService } from '../services/message.service.js';
import { JOIN_ROOM } from '../utils/common/event.constants.js'

export function roomSocketHandler(io, socket) {
    socket.on("join-room", async function roomHandler(data, cb) {
        const { slug } = data;

        socket.join(slug)
        console.log(`User joined room: ${slug}`);
    })
}

export function messageSocketHandler(io, socket) {
    socket.on("free-message", async (data, cb) => {
        const { slug, chatRoomId, username, message, isSuper} = data;

        if(isSuper === true) {
            return cb({
                message: "this is not allowed",
            })
        }
        console.log('message',data);

        
        const createdMessage = await sendMessageService({
            username,
            message,
            chatRoomId,
        })
        console.log('message created',createdMessage);
        
        io.to(slug).emit("new-message", createdMessage);
    });
}

export function isDoneToggleSocketHandler(io, socket) {
    socket.on("toggle-is-done", async ({ slug, messageId, isDone }) => {

        const updatedMessage = await isDoneMessageService({
            messageId,
            isDone
        })

        io.to(slug).emit("is-done-updated", updatedMessage);
    });
}

