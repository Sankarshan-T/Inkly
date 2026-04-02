"use client";

import { useState } from "react";
import {
    Circle,
    MousePointer2,
    Pencil,
    Pi,
    Redo2,
    Slash,
    Square,
    StickyNote,
    Trash2,
    Triangle,
    Type,
    Undo2,
    Settings2,
    Check,
} from "lucide-react";

import { ToolButton } from "./tool-button";
import { CanvasMode, CanvasState, LayerType, BackgroundMode } from "@/types/canvas";
import { useClearCanvas } from "@/hooks/use-clear-canvas";
import { useStorage } from "@liveblocks/react";
import { ConfirmationBox } from "@/components/confirmation-box";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogHeader
} from "@/components/ui/dialog";

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    bgMode: BackgroundMode;
    setBgMode: (mode: BackgroundMode) => void;
}

const BG_CONFIG: Record<BackgroundMode, { name: string; class: string }> = {
    dots: {
        name: "Dots",
        class: "bg-[radial-gradient(#94a3b8_2px,transparent_2px)] bg-[size:20px_20px]"
    },
    grid: {
        name: "Grid",
        class: "bg-[linear-gradient(to_right,#64748b40_1.5px,transparent_1.5px),linear-gradient(to_bottom,#64748b40_1.5px,transparent_1.5px)] bg-[size:20px_20px]"
    },
    isometric: {
        name: "Isometric",
        class: "bg-white bg-[radial-gradient(#64748b_1.5px,transparent_1.5px),radial-gradient(#64748b_1.5px,transparent_1.5px)] bg-[size:30px_30px] [background-position:0_0,15px_15px]"
    },
    blueprint: {
        name: "Blueprint",
        class: "bg-[#1a365d] bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:20px_20px]"
    },
    legal: {
        name: "Legal",
        class: "bg-[#fef9c3] bg-[linear-gradient(#94a3b8_1px,transparent_1px)] bg-[size:100%_24px]"
    },
    graph: {
        name: "Graph",
        class: "bg-white bg-[linear-gradient(#cbd5e1_1.5px,transparent_1.5px),linear-gradient(90deg,#cbd5e1_1.5px,transparent_1.5px),linear-gradient(#f1f5f9_1px,transparent_1px),linear-gradient(90deg,#f1f5f9_1px,transparent_1px)] bg-[size:100px_100px,100px_100px,20px_20px,20px_20px]"
    },
    carbon: {
        name: "Carbon",
        class: "bg-[#121212] bg-[repeating-linear-gradient(45deg,#1f1f1f_0,#1f1f1f_1px,transparent_0,transparent_10px)]"
    },
    slate: {
        name: "Slate",
        class: "bg-[#f8fafc]"
    },
    paper: {
        name: "Paper",
        class: "bg-[#faf9f6] [background-image:url('https://www.transparenttextures.com/patterns/felt.png')]"
    },
    notebook: {
        name: "Notebook",
        class: "bg-white bg-[linear-gradient(90deg,transparent_79px,#ef4444_2px,transparent_81px),linear-gradient(#cbd5e1_1px,transparent_0)] bg-[size:100%_1.5em]"
    }
};

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
    bgMode,
    setBgMode,
}: ToolbarProps) => {
    const clearCanvas = useClearCanvas();
    const isEmpty = useStorage((root) => root.layerIds.length === 0);

    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col rounded-2xl gap-y-4">
            <div className="p-1.5 flex gap-y-1 flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-xl">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
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
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text })}
                    isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text}
                />
                <ToolButton
                    label="Math"
                    icon={Pi}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.LatexText })}
                    isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.LatexText}
                />
                <ToolButton
                    label="Sticky Note"
                    icon={StickyNote}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note })}
                    isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note}
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Rectangle })}
                    isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle}
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse })}
                    isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse}
                />
                <ToolButton
                    label="Triangle"
                    icon={Triangle}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Triangle })}
                    isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Triangle}
                />
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                />
                <ToolButton
                    label="Line"
                    icon={Slash}
                    onClick={() => setCanvasState({ mode: CanvasMode.Line })}
                    isActive={canvasState.mode === CanvasMode.Line}
                />

                <div className="h-px w-[80%] bg-indigo-50 my-1" />

                <Dialog>
                    <DialogTrigger asChild>
                        <ToolButton
                            label="Canvas Background"
                            icon={Settings2}
                            onClick={() => { }}
                        />
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-md border-indigo-100 shadow-2xl rounded-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-indigo-950">Canvas Background</DialogTitle>
                            <DialogDescription className="text-indigo-600/70">
                                Select a pattern to change the look and feel of your whiteboard.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-4">
                            {(Object.keys(BG_CONFIG) as BackgroundMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setBgMode(mode)}
                                    className={`group flex flex-col items-center gap-y-2 p-1 transition-all rounded-xl ${bgMode === mode ? "scale-105" : "opacity-70 hover:opacity-100"
                                        }`}
                                >
                                    <div className={`
                                        h-24 w-full rounded-xl border-2 transition-all relative overflow-hidden
                                        ${bgMode === mode ? "border-indigo-600 shadow-md" : "border-neutral-200"}
                                        ${BG_CONFIG[mode].class}
                                    `}>
                                        {bgMode === mode && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/5">
                                                <Check className="h-8 w-8 text-indigo-600 drop-shadow-sm" />
                                            </div>
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${bgMode === mode ? "text-indigo-600" : "text-neutral-500"
                                        }`}>
                                        {BG_CONFIG[mode].name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
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
                        isDisabled={isEmpty!}
                    />
                </ConfirmationBox>
            </div>
        </div>
    );
};

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[450px] w-14 shadow-xl rounded-2xl border border-neutral-200 animate-pulse" />
    );
};