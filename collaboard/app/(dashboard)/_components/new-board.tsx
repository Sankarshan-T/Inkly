"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface NewBoardProps {
    disabled?: boolean;
    orgId: string;
}

export const NewBoard = ({
    orgId,
    disabled
    }: NewBoardProps) => {
    return(
        <button
            disabled={disabled}
            onClick={() => {}}
            className={cn(
                "col-span-1 aspect-100/127 bg-blue-500 rounded-lg hover:bg-blue-700 flex flex-col items-center justify-center py-6", disabled && "opacity-25"
            )}>
            <div />
            <Plus className="h-15 w-15 stroke-2 text-white"/>
            <p className="text-sm text-white font-light">New Board</p>
        </button>
    );
};
