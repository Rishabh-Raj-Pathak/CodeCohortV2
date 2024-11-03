// ProfilePage.tsx
import Profile from "./profile"; // Client Component
import { fetchRoomFromRoomId, getUser } from "./action";

export default async function ProfilePage() {
  const user = await getUser();
  const roomHistory = await fetchRoomFromRoomId();

  return <Profile user={user} roomHistory={roomHistory} />;
}
