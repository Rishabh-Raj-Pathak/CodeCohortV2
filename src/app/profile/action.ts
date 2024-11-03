"use server"

import { getRoomsOfUser } from "@/data-access/interactions";
import { getRoom } from "@/data-access/rooms";
import { getUserById } from "@/data-access/users";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getSession } from "@/lib/auth";

export async function getUser(){
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error("Not authenticated");
  }

  try{
    const user = getUserById(session.user.id);
    return user;
  }catch(error){
    throw new Error("Failed to fetch user by Id");
  }
}

export async function getUserRoomHistory(){
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error("Not authenticated");
  }

  try{
    const user = getRoomsOfUser();
    return user;
  }catch(error){
    throw new Error("Failed to Rooms of user by Id");
  }
}

export async function fetchRoomFromRoomId(){
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error("Not authenticated");
  }

  try{
    const rooms = await getRoomsOfUser();
    const roomDetailsArray = await Promise.all(
      rooms.map(async (room) => await getRoom(room.roomId)))

    console.log(roomDetailsArray);
    // const roomDetails = roomDetailsArray.flat(); 
    return roomDetailsArray;
  }catch(error){
    console.error("Failed to fetch top rooms:", error);
    throw new Error("Failed to fetch top rooms");
  }
}
