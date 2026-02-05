"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useMutation } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

export const EmptyBoards = () => {
    const { organization } = useOrganization();
    const create = useMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        create({
            orgId: organization.id,
            title: "Untitled"
        });
    };

    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={"/notes.svg"}
                height={140}
                width={140}
                alt="empty"
            />
            <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
            <p className="text-muted-foreground textg-sm mt-2">Start by creating a board for your organization...</p>
            <div className="mt-6">
                <Button size={"lg"} onClick={onClick}> 
                    <Plus />
                    Create Board
                </Button>
            </div>
        </div>
    );
};
