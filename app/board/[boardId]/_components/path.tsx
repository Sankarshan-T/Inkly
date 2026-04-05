import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";

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
    if (!points || points.length < 2) return null;

    const pathData = getSvgPathFromStroke(
        getStroke(points, {
            size: 10,
            thinning: 0.1,
            smoothing: 0.1,
            streamline: 0,
            simulatePressure: points.length !== 2,
        })
    );

    return (
        <g
            onPointerDown={onPointerDown}
            style={{ transform: `translate(${x}px, ${y}px)`, color: fill }}
        >
            <path
                d={pathData}
                fill="currentColor"
                stroke={stroke}
                strokeWidth={1}
            />
        </g>
    );
};