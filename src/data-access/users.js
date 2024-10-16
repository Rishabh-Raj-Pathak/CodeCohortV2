import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(userId) {
  await db.delete(users).where(eq(users.id, userId));
}