import { Hint } from "@/components/hint";

interface RoleDisplayProps {
    role: string;
}

export const RoleDisplay = ({ role }: RoleDisplayProps) => {
    return (
        <div className="top-2 left-2 px-3 h-12 flex items-center  bg-white/80 backdrop-blur-xs rounded-3xl border border-indigo-100 shadow-xl">
            {role === "admin" && (
                <Hint label="Admin">
                    <div className="font-medium" >🛡️ Admin</div>
                </Hint>
            )}

            {role === "editor" && (
                <Hint label="Editor">
                    <div className="font-medium">🖊️ Editor</div>
                </Hint>
            )}

            {role === "viewer" && (
                <Hint label="Viewer">
                    <div className="font-medium">👁️ Viewer</div>
                </Hint>
            )}
        </div>
    );
};