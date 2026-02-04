'use client';

import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";


const DashboardPage = () => {
    const { organization } = useOrganization();
    const searchParams = useSearchParams();

    const search = searchParams.get("search");
    const favorites = searchParams.get("favorites");

    return(
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {JSON.stringify({ search, favorites })}
            {!organization ? (
                <EmptyOrg />
            ): (
                <p>Board List</p>
            )}

        </div>
    );
};

export default DashboardPage;