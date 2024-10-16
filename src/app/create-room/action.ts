"use server";

import { createRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getServerSession(authConfig);

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  const room = await createRoom(roomData, session.user.id);

  revalidatePath("/browse");

  return room;
}
