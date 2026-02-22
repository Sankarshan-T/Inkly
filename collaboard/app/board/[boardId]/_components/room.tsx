"use client";

import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
    useStatus,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";
import { RedirectToSignIn } from "@clerk/nextjs";

interface RoomProps {
    children: ReactNode;
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
}

const RoomGuard = ({ children }: { children: ReactNode, fallback: ReactNode }) => {
    const status = useStatus();
    if (status === "disconnected") {
        return <RedirectToSignIn/>
    }

    return <>{children}</>;
};

export const Room = ({ children, roomId, fallback }: RoomProps) => {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <ErrorBoundary fallback={fallback}>
                <RoomProvider
                    id={roomId}
                    initialPresence={{ cursor: null, selection: [] }}
                    initialStorage={{
                        layers: new LiveMap<string, LiveObject<Layer>>(),
                        layerIds: new LiveList<string>([]),
                    }}
                >
                    <ClientSideSuspense fallback={fallback}>
                        {() => (
                            <RoomGuard fallback={fallback}>
                                {children}
                            </RoomGuard>
                        )}
                    </ClientSideSuspense>
                </RoomProvider>
            </ErrorBoundary>
        </LiveblocksProvider>
    );
};