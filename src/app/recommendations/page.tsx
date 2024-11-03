import { unstable_noStore } from "next/cache";
import { fetchTopRooms, getTags } from "./action";
import { RoomCard } from "@/app/browse/room-cards";
interface Room {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  tags: string;
  githubRepo: string | null;
  password: string | null;
}

export default async function Home() {
  unstable_noStore();
  const rooms = await fetchTopRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Recommended Rooms for You</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms && rooms.length > 0 ? (
          rooms.map((room: Room) => {
            return <RoomCard key={room.id} room={room} />
          })
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center mt-24">
            <img
              src="/no-data.svg"
              width="200"
              height="200"
              alt="No data image"
              className="no-data-image"
            />
            <h2 className="text-2xl">No Rooms Yet!</h2>
          </div>
        )}
      </div>
    </main>
  );
}
