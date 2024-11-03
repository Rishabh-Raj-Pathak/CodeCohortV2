"use server"

import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { getTopRooms, getUserTags } from "@/data-access/interactions";
import { getAllRooms } from "@/data-access/rooms";

export async function getTags() {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const tags = await getUserTags();
    console.log(tags);
    return tags;
  } catch (error) {
    console.error("Failed to fetch user tags:", error);
    throw new Error("Failed to fetch user tags");
  }
}

export async function fetchTopRooms(){
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error("Not authenticated");
  }

  try{
    const rooms = await getTopRooms();
    const roomDetailsArray = await Promise.all(
      rooms.map(async (room) => await getAllRooms(room.roomId)))

    console.log(roomDetailsArray);
    const roomDetails = roomDetailsArray.flat(); 
    return roomDetails;
  }catch(error){
    console.error("Failed to fetch top rooms:", error);
    throw new Error("Failed to fetch top rooms");
  }
}

