import { v4 as uuidv4 } from 'uuid';
import { Config } from '../config/server-config.js';
import chatRoomRepository from '../repositories/chatroom.repository.js'
import AppError from '../utils/errors/AppError.js';
import { getMessagesService } from './message.service.js';


const chatRoomRepo = new chatRoomRepository();



export async function createChatRoomService(data, user) {
    try {
        const { title, roomExpiry } = data;

        // room expiry
        const expiry = new Date(Date.now() + Number(roomExpiry) * 60 * 60 * 1000); // Convert hours to ms
        const token = `${title.toLowerCase().replace(/\s+/g, '-')}-${uuidv4()}`;
        console.log("token", token)
        console.log("user", user);
        const slug = `${Config.BASE_URL}/api/v1/chatroom/${token}`;

        const createdRoom = await chatRoomRepo.create({
            title: title,
            slug: token,
            roomExpiry: expiry,
            createdBy: user._id,
            isLive: true
        })
        return createdRoom;
    } catch (error) {
        throw error;
    }
}

export async function deleteChatRoomService(data, user) {
    try {
        const { id } = data;

        const room = await chatRoomRepo.getById(id);

        if (!room) {
            throw new AppError("Room not found", 404);
        }
        const isUserAdmin = room.createdBy.toString() === user._id.toString();

        if (!isUserAdmin) {
            throw new AppError("user is not an admin", 401);
        }

        const deletedRoom = await chatRoomRepo.destroy(id);

        return deletedRoom;
    } catch (error) {
        throw error;
    }
}


export async function toggleIsLiveService(data, user) {
    try {
        const { id } = data;

        const room = await chatRoomRepo.getById(id);

        if (!room) {
            throw new AppError("Room not found", 404);
        }

        const isUserAdmin = room.createdBy.toString() === user._id.toString();

        if (!isUserAdmin) {
            throw new AppError("user is not an admin", 401);
        }

        const updatedRoom = await chatRoomRepo.update(id, {
            isLive: !room.isLive
        })

        return updatedRoom;
    } catch (error) {
        throw error;
    }
}


export async function getUserChatRoomsService(userId) {
    try {
        // Get rooms created by the user
        const createdRooms = await chatRoomRepo.getByCreator(userId);
        
        // Get rooms the user has participated in (this would require a message repository lookup)
        // This is a placeholder for future implementation
        
        // For now, just return the created rooms
        return createdRooms;
    } catch (error) {
        throw error;
    }
}


export async function getChatRoomService(data, user) {
    try {
        const { slug } = data;

        const room = await chatRoomRepo.getBySlug(slug);


        if (!room) {
            throw new AppError("room not found", 404);
        }

    
        return room;
    } catch (error) {
        throw error;
    }
}