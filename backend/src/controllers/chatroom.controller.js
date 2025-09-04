import { createChatRoomService, deleteChatRoomService, getChatRoomService, getUserChatRoomsService, toggleIsLiveService } from "../services/chatroom.service.js";



export async function createChatRoom(req, res) {
    try {
        // let {title, roomExpiry} = req.body;
       
        const response = await createChatRoomService(req.body, req.user);

        return res.status(500).json({
            message: "chatroom created successfully",
            success: true,
            error: null,
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error,
            data: null
        })
    }
}

export async function deleteChatRoom(req, res) {
    try {
        const response = await deleteChatRoomService({
            id: req.params.id
        }, req.user);

        return res.status(500).json({
            message: "chatroom deleted successfully",
            success: true,
            error: null,
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error,
            data: null
        })
    }
}


export async function toggleIsLive(req, res) {
    try {

        const response = await toggleIsLiveService({
            id: req.params.id
        }, req.user);

        return res.status(500).json({
            message: "chatroom toggled successfully",
            success: true,
            error: null,
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error,
            data: null
        })
    }
}


export async function getChatRoom(req, res) {
    try {
        const response = await getChatRoomService({
            slug: req.params.slug
        }, req.user);
        console.log(response);
        return res.status(200).json({
            message: "chatroom fetched successfully",
            success: true,
            error: null,
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error,
            data: null
        })
    }
}


export async function getUserChatRooms(req, res) {
    try {
        console.log("Hello");
        const userId = req.user?._id;
        console.log("get-charoom", userId);
        const chatRooms = await getUserChatRoomsService(userId);

        return res.status(200).json({
            message: "User chatrooms fetched successfully",
            success: true,
            error: null,
            data: chatRooms
        });

    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            message: error.message || "Internal server error",
            success: false,
            error: error,
            data: null
        });
    }
}



