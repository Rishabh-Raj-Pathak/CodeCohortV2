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
import { useCallback, useEffect, useState } from "react";
import { generateTokenAction } from "./action";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export function DevFinderVideo({ room }: { room: Room }) {
  const session = useSession();
  const [videoclient, setvideoClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    if (!room) return;
    if (!session.data) {
      return;
    }
    const userId = session.data.user.id;
    const vclient = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? undefined,
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => generateTokenAction(),
    });
    const call = vclient.call("default", room.id);
    call.join({ create: true });
    setvideoClient(vclient);
    setCall(call);
    
    if (!session.data) {
      return;
    }
    
    return () => {
      call
        .leave()
        .then(() => vclient.disconnectUser())
        .catch(console.error);
    };
  }, [session, room]);

  return (
    videoclient  &&
    call && (
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
    )
  );
}