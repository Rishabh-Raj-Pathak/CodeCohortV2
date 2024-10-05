"use server";

// import { createRoom } from "@/data-access/rooms";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  // const room = await createRoom(roomData, session.user.id);

  
  // return room;
  await db.insert(room).values({ ...roomData, userId: session.user.id});
  
  revalidatePath("/browse");
}