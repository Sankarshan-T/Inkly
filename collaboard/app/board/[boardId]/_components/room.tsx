"use client";

import { ReactNode } from "react";

import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
    children: ReactNode,
    roomId: string,
};

export const Room = ({
    children,
    roomId,
}: RoomProps) => {
    return (
        <LiveblocksProvider publicApiKey=   {"pk_dev_e1yekWX75SGKB3aTDZsZh-3DQKKsblshdieEKZwfXt6GaSSk1a8QzXUUSJoaBoYa"}>
            <RoomProvider id={roomId} initialPresence={{}}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
};
