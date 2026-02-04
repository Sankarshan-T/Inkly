"use client";

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
    
    return(
        <div>
            {JSON.stringify(query)}
        </div>
    );
};
