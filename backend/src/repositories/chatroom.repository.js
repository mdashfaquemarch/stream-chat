import CrudRepository from "./crud.repository.js";
import ChatRoom from '../models/chatroom.model.js'

class ChatRoomRepository extends CrudRepository {

    constructor() {
        super(ChatRoom)
    }

    async getBySlug(slug) {
        const room = await ChatRoom.find({ slug: slug });
        return room;
    }

    async getByCreator(userId) {
        const rooms = await ChatRoom.find({ createdBy: userId }).sort({ createdAt: -1 });
        return rooms;
    }
}

export default ChatRoomRepository;