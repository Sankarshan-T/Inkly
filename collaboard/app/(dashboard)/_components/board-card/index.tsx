"use client";

import Image from "next/image";
import Link from "next/link";

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
    id, title, authorname, authorId, createdAt, imageUrl, orgId, isFavorite,
}: BoardCardProps) => {
    return(
        <Link href={`/board/${id}`}>
            <div className="group aspect-100/127 border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-blue-50">
                    <div className="h-full w-full flex items-center justify-center text-xl bg-none -z-10 hover:bg-blue-100 transition">{title}</div>
                </div>
            </div>
        </Link>
    );
};
