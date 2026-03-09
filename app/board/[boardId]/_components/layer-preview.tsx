"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import React, { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";
import { Triangle } from "./triangle";
import { LatexText } from "./latextext";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
    isDrawing: boolean;
}


export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor,
    isDrawing,
}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
        case LayerType.Triangle:
            return (
                <Triangle
                    id={id}
                    layer={layer}
                    onPointerDown={(e) => {
                        if (isDrawing) return;
                        onLayerPointerDown(e, id);
                    }}
                    selectionColor={selectionColor}
                />
            );
        case LayerType.Path:
            return (
                <Path
                    key={id}
                    points={layer.points}
                    onPointerDown={(e) => {
                        if (isDrawing) return;
                        onLayerPointerDown(e, id);
                    }}
                    x={layer.x}
                    y={layer.y}
                    fill={layer.fill ? colorToCss(layer.fill) : "#197278"}
                    stroke={selectionColor}
                />
            )
        case LayerType.Note:
            return (
                <Note
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Text:
            return (
                <Text
                    id={id}
                    layer={layer}
                    onPointerDown={(e) => {
                        if (isDrawing) return;
                        onLayerPointerDown(e, id);
                    }}
                    selectionColor={selectionColor}
                />
            )

        case LayerType.LatexText:
            return (
                <LatexText
                    id={id}
                    layer={layer}
                    onPointerDown={(e) => {
                        if (isDrawing) return;
                        onLayerPointerDown(e, id);
                    }}
                    selectionColor={selectionColor}
                />
            )

        case LayerType.Ellipse:
            return (
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerDown={(e) => {
                        if (isDrawing) return;
                        onLayerPointerDown(e, id);
                    }}
                    selectionColor={selectionColor}
                />
            );
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={(e) => {
                        if (isDrawing) return;
                        onLayerPointerDown(e, id);
                    }}
                    selectionColor={selectionColor}
                />
            );
        default:
            console.warn("Unknown layer")
    }
});

LayerPreview.displayName = "LayerPreview";
