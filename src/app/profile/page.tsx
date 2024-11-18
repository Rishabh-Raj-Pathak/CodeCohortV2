import Profile from "./profile"; // Client Component
import { fetchRoomFromRoomId, getUser } from "./action";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  try {
    const user = await getUser();
    const roomHistory = await fetchRoomFromRoomId();

    if (!user) {
      redirect("/login"); // Redirect to login if user is not authenticated
    }

    return <Profile user={user} roomHistory={roomHistory} />;
  } catch (error) {
    console.error("Error in ProfilePage:", error);
    redirect("/login"); // Handle error by redirecting or showing an error page
  }
}
