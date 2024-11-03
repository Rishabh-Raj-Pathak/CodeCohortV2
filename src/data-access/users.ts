import { db } from "@/db";
import { users, User } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}

export async function getUserById(userId: string){
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  })

  return user;
}

export async function editUser(userData: User) {
  const updated = await db
    .update(users)
    .set(userData)
    .where(eq(users.id, userData.id))
    .returning();
  return updated[0];
}