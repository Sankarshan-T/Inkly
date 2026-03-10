import { Hint } from "@/components/hint";

interface RoleDisplayProps {
    role: string;
}

export const RoleDisplay = ({ role }: RoleDisplayProps) => {
    return (
        <div className="top-2 left-2 px-3 h-12 flex items-center  bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-xl">
            {role === "admin" && (
                <Hint label="Admin">
                    <div>🛡️</div>
                </Hint>
            )}

            {role === "editor" && (
                <Hint label="Editor">
                    <div>🖊️</div>
                </Hint>
            )}

            {role === "viewer" && (
                <Hint label="Viewer">
                    <div>👁️</div>
                </Hint>
            )}
        </div>
    );
};