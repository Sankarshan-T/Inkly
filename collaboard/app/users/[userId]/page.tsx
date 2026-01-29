interface UserIdPageProps {
    params: Promise<{
        userId: string
    }>;
};

const Page = async({
    params
}: UserIdPageProps) => {
    const { userId } = await params;
    return(
        <div>
            User ID : {userId}
        </div>
    );
};

export default Page;