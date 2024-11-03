import { db } from "@/db";
import { userRoomInteractions } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function getUserTags() {
  
  const session = await getServerSession(authConfig);
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const interactions = await db.query.userRoomInteractions.findMany({
    where: eq(userRoomInteractions.userId, session.user.id),
  });

  const allTags = interactions
    .flatMap((interaction) => interaction.visitedTags.split(","))
    .map((tag) => tag.trim().toLowerCase());

  const uniqueTags = Array.from(new Set(allTags));

  return uniqueTags;
}

export async function getTopRooms(){
  const session = await getServerSession(authConfig);
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }
  const rooms = await db
    .select()
    .from(userRoomInteractions)
    .where(eq(userRoomInteractions.userId, session.user.id))
    .orderBy(desc(userRoomInteractions.frequency))
    .limit(10)
    .execute();

  return rooms;
}

export async function getRoomsOfUser(){
  const session = await getServerSession(authConfig);
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }
  const rooms = await db
    .select()
    .from(userRoomInteractions)
    .where(eq(userRoomInteractions.userId, session.user.id))
    .orderBy(desc(userRoomInteractions.frequency))
    .execute();

  return rooms;
}