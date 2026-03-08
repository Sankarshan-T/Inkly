import { TextLayer } from "@/types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Nerko_One } from "next/font/google";
import React from "react";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@liveblocks/react";

const font = Nerko_One({
    subsets: ["latin"],
    weight: ["400"],
});

const calculateFontSize = (width: number, height: number,) => {
    const maxFontSize = 192;
    const scaleFactor = 0.5;
    const fontSizeOnHeight = height * scaleFactor;
    const fontSizeOnWidth = width * scaleFactor;

    return Math.min(fontSizeOnHeight, fontSizeOnWidth, maxFontSize);
};

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: TextProps) => {
    const { x, y, width, height, fill, value } = layer;
    const MAX_WIDTH = 400;


    const updateValue = useMutation((
        { storage },
        newValue: string,
    ) => {
        const liveLayers = storage.get("layers");

        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        const text = e.target.value;
        updateValue(text);

        const el = e.currentTarget as HTMLElement;
        const fontSize = 48;

        const textWidth = measureTextWidth(text, fontSize);
        const lineHeight = fontSize * 1.2;

        const lines = Math.ceil(textWidth / MAX_WIDTH);

        const currentLines = Math.round((height - 10) / lineHeight);
        let newHeight = height;

        if (lines > currentLines) {
            newHeight = lines * lineHeight + 10;
        }

        const newWidth = Math.min(textWidth + 20, MAX_WIDTH);

        updateSize(newWidth, newHeight);
    };

    const updateSize = useMutation(({ storage }, w: number, h: number) => {
        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(id);

        layer?.set("width", w);
        layer?.set("height", h);
    }, []);

    const measureTextWidth = (text: string, fontSize: number) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return 0;

        context.font = `${fontSize}px Nerko One`;
        const metrics = context.measureText(text);

        return metrics.width;
    };

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
                userSelect: "none",
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "w-full h-full drop-shadow-md outline-none",
                    font.className
                )}
                style={{
                    fontSize: 48,
                    lineHeight: 1.2,
                    color: fill ? colorToCss(fill) : "#000",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                }}
            />
        </foreignObject>
    );
};