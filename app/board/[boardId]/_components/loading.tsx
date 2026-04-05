import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";
import { TopbarSkeleton } from "./topbar";

export const Loading = () => {
    return (
        <main
            className="h-full w-full relative bg-background touch-none flex items-center justify-center"
        >
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
            <InfoSkeleton />
            <TopbarSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    );
};

