"use clinet";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    side?: "bottom" | "right"
}

export const ToolButton = ({
    label,
    icon: Icon,
    onClick,
    isActive,
    isDisabled,
    side
}: ToolButtonProps) => {
    return (
        <Hint label={label} side={side ? side : "right"} sideOffset={10}>
            <Button
                disabled={isDisabled}
                onClick={onClick}
                size={"icon"}
                variant={isActive ? "boardActive" : "board"}
            >
                <Icon />
            </Button>
        </Hint>
    );
};
