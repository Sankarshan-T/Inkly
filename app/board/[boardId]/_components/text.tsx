"use client";

import { TextLayer } from "@/types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Nerko_One } from "next/font/google";
import React from "react";
import { cn, colorToCss } from "@/lib/utils";
import { useMutation } from "@liveblocks/react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

const font = Nerko_One({
    subsets: ["latin"],
    weight: ["400"],
});

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: TextProps) => {
    const { x, y, width, height, fill, value } = layer;
    const MAX_WIDTH = 400;

    const [editing, setEditing] = React.useState(false);

    const symbolMap: Record<string, string> = {
        pi: "\\pi",
        theta: "\\theta",
        alpha: "\\alpha",
        beta: "\\beta",
        gamma: "\\gamma",
        delta: "\\delta",
        sqrt: "\\sqrt",
        infinity: "\\infty",
    };

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const measureTextWidth = (text: string, fontSize: number) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return 0;
        ctx.font = `${fontSize}px Nerko One`;
        return ctx.measureText(text).width;
    };

    const updateSize = useMutation(({ storage }, w: number, h: number) => {
        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(id);
        layer?.set("width", w);
        layer?.set("height", h);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        const text = e.target.value;
        updateValue(text);

        const fontSize = 48;
        const textWidth = measureTextWidth(text, fontSize);
        const lineHeight = fontSize * 1.2;
        const lines = Math.ceil(textWidth / MAX_WIDTH);
        const currentLines = Math.round((height - 10) / lineHeight);
        const newHeight = lines > currentLines ? lines * lineHeight + 10 : height;
        const newWidth = Math.min(textWidth + 20, MAX_WIDTH);
        updateSize(newWidth, newHeight);
    };

    const replaceSymbols = (text: string) => {
        return text.replace(/\b(pi|theta|alpha|beta|gamma|delta|infinity)\b/g, (match) => {
            return symbolMap[match] || match;
        });
    };

    const renderWithMath = (text: string) => {
        if (!text) return <span>Text</span>;

        const regex = /(\$.*?\$|\/frac \S+ \S+|\/sqrt \S+|\/int|\/sum|[0-9]+\/[0-9]+|\b(?:pi|theta|alpha|beta|gamma|delta|infinity)\b|\S+\^\{?[^\s}]+\}?)/g;
        const parts = text.split(regex);

        return parts
            .filter(Boolean)
            .map((part, i) => {
                if (!part) return null;

                if (part.startsWith("$") && part.endsWith("$")) {
                    return <InlineMath key={i} math={part.slice(1, -1)} />;
                }

                if (symbolMap[part]) {
                    return <InlineMath key={i} math={symbolMap[part]} />;
                }

                if (/^\/frac \S+ \S+$/.test(part)) {
                    const [, num, den] = part.split(" ");
                    return <InlineMath key={i} math={`\\frac{${num}}{${den}}`} />;
                }

                if (/^\/sqrt \S+$/.test(part)) {
                    const [, val] = part.split(" ");
                    return <InlineMath key={i} math={`\\sqrt{${val}}`} />;
                }

                if (part === "/int") return <InlineMath key={i} math="\\int_{□}^{□}" />;
                if (part === "/sum") return <InlineMath key={i} math="\\sum_{□}^{□}" />;

                if (/^\d+\/\d+$/.test(part)) {
                    const [num, den] = part.split("/");
                    return <InlineMath key={i} math={`\\frac{${num}}{${den}}`} />;
                }

                if (/^\S+\^\S+$/.test(part)) {
                    return <InlineMath key={i} math={part.replace(/(\S+)\^(\S+)/, "$1^{$2}")} />;
                }

                if (/^\S+\^\{?[^\s}]+\}?$/.test(part)) {
                    const latex = part.replace(/(\S+)\^(\S+)/, "$1^{$2}");
                    return <InlineMath key={i} math={latex} />;
                }

                return <span key={i}>{part}</span>;
            });
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
            {editing ? (
                <ContentEditable
                    html={value || ""}
                    onChange={handleContentChange}
                    onBlur={() => setEditing(false)}
                    className={cn("w-full h-full outline-none", font.className)}
                    style={{
                        fontSize: 48,
                        lineHeight: 1.2,
                        color: fill ? colorToCss(fill) : "#000",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                />
            ) : (
                <div
                    onClick={() => setEditing(true)}
                    className={cn("w-full h-full cursor-text", font.className)}
                    style={{
                        fontSize: 48,
                        lineHeight: 1.2,
                        color: fill ? colorToCss(fill) : "#000",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                    }}
                >
                    {renderWithMath(value || "")}
                </div>
            )}
        </foreignObject>
    );
};