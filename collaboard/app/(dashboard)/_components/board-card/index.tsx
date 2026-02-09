"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Clipboard, MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import Image from "next/image";

interface BoardCardProps {
    id: string;
    title: string;
    authorname: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id, title, authorname, authorId, createdAt, orgId, isFavorite, imageUrl
}: BoardCardProps) => {
    const { userId } = useAuth();

    const authorlabel = userId === authorId ?  "You" : authorname;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    return(
        <Link href={`/board/${id}`} className="group">
            <div className="group aspect-100/127 border rounded-lg overflow-hidden flex flex-col justify-between">
                <div className="h-full w-full relative flex-1 bg-blue-300">
                    <Image
                        src={imageUrl}
                        alt="board"
                        fill
                        className="object-fit p-2"
                    />

                    <Overlay /> 
                    <Actions
                        id={id}
                        title={title}
                        side={"right"}
                    >
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity"/>
                        </button>
                    </Actions>   
                </div> 
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorlabel}
                    createdAtLabel={createdAtLabel}
                    onClick={() => {}}
                    disabled={false}
                />  
            </div>
                     
        </Link>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return(
        <div className="aspect-100/127 rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div> 
    );
};