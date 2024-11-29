"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateTokenAction } from "./action";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export function DevFinderVideo({ room }: { room: Room }) {
  const { data: session } = useSession();
  const [videoclient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!room || !session) {
      console.error("Room or session is invalid");
      return;
    }

    if (!apiKey) {
      console.error("API Key is missing");
      return;
    }

    const initializeVideo = async () => {
      try {
        const userId = session.user.id;
        const vclient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: session.user.name ?? undefined,
            image: session.user.image ?? undefined,
          },
          tokenProvider: () => generateTokenAction(),
        });

        const call = vclient.call("default", room.id);
        await call.join({ create: true });
        setVideoClient(vclient);
        setCall(call);
      } catch (error) {
        console.error("Error initializing video client:", error);
      }
    };

    initializeVideo();

    return () => {
      if (call && videoclient) {
        call
          .leave()
          .then(() => videoclient.disconnectUser())
          .catch((err) => console.error("Error during cleanup:", err));
      }
    };
  }, [room, session]);

  if (!videoclient || !call) {
    return <div>Loading video...</div>;
  }

  return (
    <StreamVideo client={videoclient}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls
            onLeave={() => {
              router.push("/");
            }}
          />
          <CallParticipantsList onClose={() => undefined} />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
