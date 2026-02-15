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
    fallback: NonNullable<ReactNode> | null
};

export const Room = ({
    children,
    roomId,
    fallback,
}: RoomProps) => {
    return (
        <LiveblocksProvider publicApiKey=   {"pk_dev_e1yekWX75SGKB3aTDZsZh-3DQKKsblshdieEKZwfXt6GaSSk1a8QzXUUSJoaBoYa"}>
            <RoomProvider id={roomId} initialPresence={{}}>
                <ClientSideSuspense fallback={fallback}>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
};
