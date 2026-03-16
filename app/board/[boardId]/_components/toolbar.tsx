"use client";

import { Circle, Infinity, MousePointer2, Pencil, Pi, Redo2, ScreenShare, Slash, Square, StickyNote, Trash2, Triangle, Type, Undo2 } from "lucide-react";
import { ToolButton } from "./tool-button";
import { CanvasMode, CanvasSizeMode, CanvasState, LayerType } from "@/types/canvas";
import { useClearCanvas } from "@/hooks/use-clear-canvas";
import { useStorage } from "@liveblocks/react";
import { ConfirmationBox } from "@/components/confirmation-box";

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
};

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
}: ToolbarProps) => {
    const clearCanvas = useClearCanvas();
    const isEmpty = useStorage((root) => root.layerIds.length === 0);

    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col rounded-2xl gap-y-4 ">
            <div className=" p-1.5 flex gap-y-1 flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-xl">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.None,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                />

                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Text,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                />

                <ToolButton
                    label="Math"
                    icon={Pi}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.LatexText,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.LatexText
                    }
                />

                <ToolButton
                    label="Sticky Note"
                    icon={StickyNote}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                />

                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                />

                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                />

                <ToolButton
                    label="Triangle"
                    icon={Triangle}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Triangle,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Triangle
                    }
                />

                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Pencil
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }
                />

                <ToolButton
                    label="Line"
                    icon={Slash}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Line
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Line
                    }
                />
            </div>
            <div className="p-1.5 flex gap-y-1 flex-col items-center bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-100 shadow-xl">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    onClick={undo}
                    isDisabled={!canUndo}
                />

                <ToolButton
                    label="Redo"
                    icon={Redo2}
                    onClick={redo}
                    isDisabled={!canRedo}
                />

                <ConfirmationBox
                    onConfirm={clearCanvas}
                    header="Are you sure you want to clear? This action is irreversible"
                >
                    <ToolButton
                        label="Clear Canvas"
                        icon={Trash2}
                        onClick={() => { }}
                        isDisabled={isEmpty || undefined}
                    />
                </ConfirmationBox>
            </div>
        </div>
    );
};

export const ToolbarSkeleton = () => {
    return (
        <div
            className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-90 w-13 shadow-md rounded-md"
        />
    )
}
