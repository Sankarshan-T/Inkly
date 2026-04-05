import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface FooterProps {
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    isFavorite: boolean;
    onClick: () => void;
    disabled: boolean;
};

export const Footer = ({
    title,
    authorLabel,
    createdAtLabel,
    isFavorite,
    onClick,
    disabled,
}: FooterProps) => {
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();

        onClick();
    };

    return (
        <div className="relative bg-card p-2">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)] text-primary">
                {title}
            </p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-primary truncate">
                {authorLabel}, {createdAtLabel}
            </p>
            <button
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-primary hover:text-primary-foreground", disabled && "cursor-not-allowed opacity-65"
                )}
            >
                <Star
                    className={cn("h-4 w-4", isFavorite && "fill-primary text-primary")}
                />
            </button>
        </div>
    )
}
