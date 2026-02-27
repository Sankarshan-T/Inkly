import { TriangleLayer } from "@/types/canvas";
import { colorToCss } from "@/lib/utils";

interface TriangleProps {
    id: string;
    layer: TriangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Triangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: TriangleProps) => {
    const { x, y, width, height, fill, outlineOnly, strokeWidth } = layer;

    return (
        <path
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            d={`M ${width / 2} 0 L ${width} ${height} L 0 ${height} Z`}
            fill={outlineOnly ? "transparent" : colorToCss(fill)}
            stroke={outlineOnly ? colorToCss(fill) : selectionColor || "transparent"}
            strokeWidth={strokeWidth || 2}
        />
    );
};