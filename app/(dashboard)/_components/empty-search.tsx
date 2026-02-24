import Image from "next/image";

export const EmptySearch = () => {
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src={"/search.svg"}
                height={200}
                width={200}
                alt="empty"
            />
            <h2 className="text-2xl font-semibold mt-6">No Results found</h2>
            <p className="text-muted-foreground textg-sm mt-2">Try searching for something else...</p>
        </div>
    );
};
