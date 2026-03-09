import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";
import React from "react";

interface PathProps {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (e: React.PointerEvent) => void;
    stroke?: string;
}

export const Path = ({
    x,
    y,
    points,
    fill,
    onPointerDown,
    stroke,
}: PathProps) => {

    if (points.length === 2) {
        const [start, end] = points;

        return (
            <line
                className="drop-shadow-md"
                onPointerDown={onPointerDown}
                x1={start[0]}
                y1={start[1]}
                x2={end[0]}
                y2={end[1]}
                stroke={fill}
                strokeWidth={12}
                strokeLinecap="round"
                style={{
                    transform: `translate(${x}px, ${y}px)`
                }}
            />
        );
    }

    return (
        <path
            className="drop-shadow-md"
            onPointerDown={onPointerDown}
            d={getSvgPathFromStroke(
                getStroke(points, {
                    size: 16,
                    thinning: 0.5,
                    smoothing: 0.5,
                    streamline: 0.5,
                    simulatePressure: true,
                })
            )}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
        />
    );
};