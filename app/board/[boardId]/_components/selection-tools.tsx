"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color, LayerType } from "@/types/canvas";
import { useMutation, useSelf, useStorage } from "@liveblocks/react";
import { memo, useMemo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2, BoxSelect } from "lucide-react";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
};



export const SelectionTools = memo(({
    camera,
    setLastUsedColor,
}: SelectionToolsProps) => {
    const liveLayers = useStorage((root) => root.layers);
    const selection = useSelf((me) => me.presence.selection);

    const isFillableOrStrokable = useMemo(() => {
        if (!selection || selection.length === 0) return false;
        if (!liveLayers) return;

        return selection.every((id) => {
            const layer = liveLayers.get(id);
            return (
                layer?.type === LayerType.Rectangle ||
                layer?.type === LayerType.Ellipse ||
                layer?.type === LayerType.Triangle
            );
        });
    }, [selection, liveLayers]);



    const sendToBack = useMutation(({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i);
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayerIds.move(indices[i], i);
        }
    }, [selection]);

    const bringToFront = useMutation(({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i);
            }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
            liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i));
        }
    }, [selection]);

    const setFill = useMutation((
        { storage },
        fill: Color,
    ) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        })
    }, [selection, setLastUsedColor]);

    const toggleFill = useMutation(({ storage }) => {
        const liveLayers = storage.get("layers") as any;

        selection?.forEach((id) => {
            const layer = liveLayers.get(id);

            if (layer) {
                const currentOutline = layer.get("outlineOnly");
                layer.set("outlineOnly", !currentOutline);
            }
        });
    }, [selection]);

    const setStrokeWidth = useMutation(({ storage }, width: number) => {
        const liveLayers = storage.get("layers") as any;

        selection?.forEach((id) => {
            const layer = liveLayers.get(id);
            if (layer) {
                layer.set("strokeWidth", width);    
            }
        });
    }, [selection]);

    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
            style={{
                transform: `translate(
                    calc(${x}px - 50%),
                    calc(${y - 16}px - 100%)
                )`
            }}
        >
            <ColorPicker
                onChange={setFill}
            />

            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to Front">
                    <Button variant={"board"} size={"icon"} onClick={bringToFront}>
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint label="Send to Back" side="bottom">
                    <Button variant={"board"} size={"icon"} onClick={sendToBack}>
                        <SendToBack />
                    </Button>
                </Hint>
                {isFillableOrStrokable && (
                    <Hint label="Toggle Fill">
                        <Button
                            variant={"board"}
                            size={"icon"}
                            onClick={toggleFill}
                        >
                            <BoxSelect />
                        </Button>
                    </Hint>
                )}
            </div>

            {isFillableOrStrokable && (
                <div className="flex flex-col items-center pl-2 ml-2 border-l border-neutral-200 gap-x-0.5">
                    <Hint label="Thin">
                        <Button
                            onClick={() => setStrokeWidth(2)}
                            variant="board"
                            size="icon"
                        >
                            <div className="w-4 bg-black rounded-full h-0.5" />
                        </Button>
                    </Hint>
                    <Hint label="Medium" side="left">
                        <Button
                            onClick={() => setStrokeWidth(5)}
                            variant="board"
                            size="icon"
                        >
                            <div className="w-4 bg-black rounded-full h-1" />
                        </Button>
                    </Hint>
                    <Hint label="Thick" side="bottom">
                        <Button
                            onClick={() => setStrokeWidth(10)}
                            variant="board"
                            size="icon"
                        >
                            <div className="w-4 bg-black rounded-full h-1.5" />
                        </Button>
                    </Hint>
                </div>
            )}

            <div className="flex items-center justify-center pl-2 ml-2 border-l border-neutral-200 flex-col gap-y-0.5">
                <Hint label="Delete" side="bottom">
                    <Button
                        variant={"board"}
                        size={"icon"}
                        onClick={deleteLayers}
                    >
                        <Trash2 />
                    </Button>
                </Hint>
            </div>
        </div>
    );
});