import { Canvas } from "./_components/canvas";
import { Room } from "./_components/room";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>;
};

const BoardIdPage = async ({
    params,
}: BoardIdPageProps) => {
    const { boardId } = await params;

    if (!boardId) return null;

    return (
        <Room roomId={boardId}>
            <Canvas boardId={boardId} />
        </Room>
    );
};

export default BoardIdPage;