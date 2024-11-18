"use server";

import { editUser, getUserById } from "@/data-access/users";
import { User } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function editUserAction(userData: Omit<User, "id"> & { id: string }) {
  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to edit your profile.");
  }

  const user = await getUserById(userData.id);

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.id !== session.user.id) {
    throw new Error("You are not authorized to edit this profile.");
  }

  await editUser({ ...userData });


  redirect("/profile"); 
}
