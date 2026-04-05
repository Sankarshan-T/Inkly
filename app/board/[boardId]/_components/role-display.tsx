import { Hint } from "@/components/hint";

interface RoleDisplayProps {
    role: string;
}

export const RoleDisplay = ({ role }: RoleDisplayProps) => {
    return (
        <div className="top-2 left-2 px-3 h-12 flex items-center  bg-card/80 backdrop-blur-xs rounded-3xl border border-border shadow-xl">
            {role === "admin" && (
                <Hint label="Admin">
                    <div className="font-medium text-primary" >🛡️ Admin</div>
                </Hint>
            )}

            {role === "editor" && (
                <Hint label="Editor">
                    <div className="font-medium text-primary">🖊️ Editor</div>
                </Hint>
            )}

            {role === "viewer" && (
                <Hint label="Viewer">
                    <div className="font-medium text-primary">👁️ Viewer</div>
                </Hint>
            )}
        </div>
    );
};