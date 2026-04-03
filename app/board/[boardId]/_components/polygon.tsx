"use client";

import { colorToCss } from "@/lib/utils";

interface PolygonProps {
    id: string;
    layer: any;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
    points: string;
}

export const Polygon = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
    points,
}: PolygonProps) => {
    const { x, y, fill, outlineOnly, strokeWidth } = layer;

    return (
        <polygon
            onPointerDown={(e) => onPointerDown(e, id)}
            points={points}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            fill={outlineOnly ? "transparent" : colorToCss(fill)}
            stroke={selectionColor || colorToCss(fill)}
            strokeWidth={strokeWidth || 1}
        />
    );
};