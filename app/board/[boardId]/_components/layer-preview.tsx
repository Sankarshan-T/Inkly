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
import { Polygon } from "./polygon";

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
        case LayerType.Diamond:
            return (
                <Polygon
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    points={`0,${layer.height / 2} ${layer.width / 2},0 ${layer.width},${layer.height / 2} ${layer.width / 2},${layer.height}`}
                />
            );
        case LayerType.Pentagon:
            return (
                <Polygon
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    points={`${layer.width * 0.5},0 ${layer.width},${layer.height * 0.38} ${layer.width * 0.81},${layer.height} ${layer.width * 0.19},${layer.height} 0,${layer.height * 0.38}`}
                />
            );
        case LayerType.Hexagon:
            return (
                <Polygon
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    points={`${layer.width * 0.25},0 ${layer.width * 0.75},0 ${layer.width},${layer.height * 0.5} ${layer.width * 0.75},${layer.height} ${layer.width * 0.25},${layer.height} 0,${layer.height * 0.5}`}
                />
            );
        case LayerType.Star:
            return (
                <Polygon
                    id={id}
                    layer={layer}
                    selectionColor={selectionColor}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    points={`
                            ${layer.width * 0.5},0 
                            ${layer.width * 0.63},${layer.height * 0.38} 
                            ${layer.width},${layer.height * 0.38} 
                            ${layer.width * 0.69},${layer.height * 0.59} 
                            ${layer.width * 0.82},${layer.height} 
                            ${layer.width * 0.5},${layer.height * 0.75} 
                            ${layer.width * 0.18},${layer.height} 
                            ${layer.width * 0.31},${layer.height * 0.59} 
                            0,${layer.height * 0.38} 
                            ${layer.width * 0.37},${layer.height * 0.38}
                        `}
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
            console.warn("Unknown layer type");
            return null;
    }
});

LayerPreview.displayName = "LayerPreview";