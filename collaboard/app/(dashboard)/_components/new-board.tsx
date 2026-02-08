"use client";

import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
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
    const { mutate, pending } = useApiMutation(api.board.create);
    
    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Board Created!");
        })
        .catch(() => {
            toast.error("Failed to create board");
        })
    }

    return(
        <button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-100/127 bg-blue-500 rounded-lg hover:bg-blue-700 flex flex-col items-center justify-center py-6", (pending || disabled) && "opacity-25 hover:bg-blue-500 cursor-not-allowed"
            )}>
            <div />
            <Plus className="h-15 w-15 stroke-2 text-white"/>
            <p className="text-sm text-white font-light">New Board</p>
        </button>
    );
};
