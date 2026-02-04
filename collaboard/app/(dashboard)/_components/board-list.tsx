"use client";

import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

export const BoardList = ({
    orgId,
    query
}: BoardListProps) => {
    const data = [];

    if (!data?.length && query.search) {
        return <EmptySearch />
    }

    if (!data?.length && query.favorites) {
        return <EmptyFavorites />
    }

    if (!data?.length) {
        return(
            <div>
                You dont have any boards now.
            </div>
        );
    }
};
