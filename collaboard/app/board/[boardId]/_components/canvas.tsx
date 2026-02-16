"use client";

import { Info } from "./info";
import { Toolbar } from "./toolbar";
import { Participants } from "./participants";

import { useSelf } from "@liveblocks/react"
import { Loading } from "./loading";

interface CanvasProps {
    boardId: string;
};

export const Canvas = ({
    boardId,
}: CanvasProps) => {
    return (
        <main
            className="h-full w-full relative bg-neutral-100 touch-none"
        >
            <Info boardId={boardId}/>
            <Participants />
            <Toolbar />
        </main>
    );
};
