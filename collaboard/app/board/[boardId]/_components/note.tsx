import { NoteLayer } from "@/types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Nerko_One } from "next/font/google";
import React from "react";
import { cn, colorToCss, getContrastTextColors } from "@/lib/utils";
import { useMutation } from "@liveblocks/react";

const font = Nerko_One({
    subsets: ["latin"],
    weight: ["400"],
});

const calculateFontSize = (width: number, height: number,) => {
    const maxFontSize = 96;
    const scaleFactor = 0.15;
    const fontSizeOnHeight = height * scaleFactor;
    const fontSizeOnWidth = width * scaleFactor;

    return Math.min(fontSizeOnHeight, fontSizeOnWidth, maxFontSize);
};

interface NoteProps {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Note = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: NoteProps) => {
    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation((
        { storage },
        newValue: string,
    ) => {
        const liveLayers = storage.get("layers");

        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `ipx solid ${selectionColor}` : "none",
                backgroundColor: fill ? colorToCss(fill) : "#197278",
                userSelect: "none",
            }}
            className="shadow-md drop-shadow-xl"
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center outline-none", font.className
                )}
                style={{
                    fontSize: calculateFontSize(width, height),
                    color: fill ? getContrastTextColors(fill) : "#000"
                }}
            />
        </foreignObject>
    );
};