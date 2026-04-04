"use client";

import { useOthers, useSelf } from "@liveblocks/react";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";
import { ToolButton } from "./tool-button";
import { Camera, Minus, Plus } from "lucide-react";

interface TopbarProps {
    resetCamera: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    zoom: number;
}

export const Topbar = ({
    resetCamera,
    zoomIn,
    zoomOut,
    zoom,
}: TopbarProps) => {
    return (
        <div className="absolute top-2 left-[45%] px-1.5 h-12 flex items-center justify-between  bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-xl">
            <ToolButton
                side="bottom"
                icon={Minus}
                onClick={zoomOut}
                label="Zoom out"
            />
            <ToolButton
                side="bottom"
                icon={Camera}
                onClick={resetCamera}
                label="Reset Camera"
            />
            <ToolButton
                side="bottom"
                icon={Plus}
                onClick={zoomIn}
                label="Zoom in"
            />
            <div className="font-medium text-xs">
                {Math.round(zoom * 100)}%
            </div>
        </div>
    );
};

export const TopbarSkeleton = () => {
    return (
        <div
            className="absolute h-12 top-2 right-[50%] bg-white rounded-md p-3 flex items-center shadow-md w-25"
        />
    );
}