"use client";

import type { DropdownMenuContentProps }  from "@radix-ui/react-dropdown-menu";
import { useApiMutation } from "@/hooks/use-api-mutation";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {
    const { mutate, pending } = useApiMutation(api.board.remove);


    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`,).then(() => toast.success("Link copied")).catch(() => toast.error("Failed to copy link"))
    };

    const remove = () => {
        mutate({ id })
        .then(() => toast.success("Board deleted"))
        .catch(() => toast.error("Failed to delete board"))
    } 

  return(
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent side={side} sideOffset={sideOffset} className="w-60" onClick={(e) => e.stopPropagation()} >
            <DropdownMenuItem
                onClick={copyLink}
                className="p-3 cursor-pointer"
            >
                <Link2 className="h-4 w-4 mr-2 " />
                Copy board link
            </DropdownMenuItem>

            <DropdownMenuItem
                onClick={remove}
                className="p-3 cursor-pointer"
            >
                <Trash2 className="h-4 w-4 mr-2 " />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
};
