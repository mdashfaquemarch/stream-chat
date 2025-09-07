import { API_BASE_URL } from "../config";

export async function getChatRoomBySlug(slug) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/chatroom/${slug}`);
    const data = await response.json();
    console.log("Chat room data:", data?.data[0]);
    return data?.data[0];
  } catch (error) {
    console.error("Error fetching chat room:", error);
  }
}


export async function fetchMessages(chatRoomId) {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatRoomId }),
    });
    const data = await response.json();
    console.log("fetch message:", data?.data);
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}
