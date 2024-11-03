"use server"

import { getRooms } from "@/data-access/rooms";
import { db } from "@/db";
import { userRoomInteractions } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function trackRoomVisit({
  userId,
  roomId,
  visitedTags,
}: {
  userId: string;
  roomId: string;
  visitedTags: string;
}) {
  if (!userId || !roomId || !visitedTags) {
    throw new Error("Missing required fields: userId, roomId, or visitedTags.");
  }

  console.log("Checking for existing interaction for user:", userId, "and room:", roomId);

  const existingInteraction = await db
    .select()
    .from(userRoomInteractions)
    .where(
      and(eq(userRoomInteractions.userId, userId), eq(userRoomInteractions.roomId, roomId))
    )
    .limit(1)
    .execute();

  if (existingInteraction.length > 0) {
    const currentFrequency = existingInteraction[0].frequency || 1;
    await db
      .update(userRoomInteractions)
      .set({ visitedTags,
        frequency: currentFrequency+1
       })
      .where(
        and(eq(userRoomInteractions.userId, userId), eq(userRoomInteractions.roomId, roomId))
      );
    return { message: "Interaction updated successfully" };
  }

  await db.insert(userRoomInteractions).values({
    userId,
    roomId,
    visitedTags,
    frequency: 1,
  });

  console.log("Room interaction tracked successfully");
  return { message: "Interaction tracked successfully" };
}

// export const validatePassword = async ( roomId: string, password: string) => {
//   const room = await getRooms(roomId);
//   if (!room || !room.password) {
//     return { isValid: true }; 
//   }
//   const isPasswordCorrect = await bcrypt.compare(password, room.password);
//   return { isValid: isPasswordCorrect };
// }
