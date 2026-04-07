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
    Plus,
    Shapes,
    LineSquiggle,
    Diamond,
    Hexagon,
    Star,
    Pentagon,
    Camera,
    EraserIcon,
    ImageIcon,
    Keyboard,
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
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";

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

const shortcutGroups = [
    {
        group: "System",
        items: [
            { key: "Ctrl + Z", label: "Undo" },
            { key: "Ctrl + Y", label: "Redo" },
            { key: "Ctrl + D", label: "Duplicate" },
            { key: "Del", label: "Delete" },
        ],
    },
    {
        group: "Tools",
        items: [
            { key: "S", label: "Select Mode" },
            { key: "K", label: "Pencil" },
            { key: "L", label: "Line" },
        ],
    },
    {
        group: "Insert Shapes",
        items: [
            { key: "N", label: "Sticky Note" },
            { key: "T", label: "Text" },
            { key: "F", label: "LaTeX Formula" },
            { key: "R", label: "Rectangle" },
            { key: "E", label: "Ellipse" },
            { key: "I", label: "Triangle" },
            { key: "G", label: "Diamond" },
            { key: "P", label: "Pentagon" },
            { key: "H", label: "Hexagon" },
            { key: "A", label: "Star" },
        ],
    },
];

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
        class: "bg-background bg-[radial-gradient(#64748b_1.5px,transparent_1.5px),radial-gradient(#64748b_1.5px,transparent_1.5px)] bg-[size:30px_30px] [background-position:0_0,15px_15px]"
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
        class: "bg-background bg-[linear-gradient(#cbd5e1_1.5px,transparent_1.5px),linear-gradient(90deg,#cbd5e1_1.5px,transparent_1.5px),linear-gradient(#f1f5f9_1px,transparent_1px),linear-gradient(90deg,#f1f5f9_1px,transparent_1px)] bg-[size:100px_100px,100px_100px,20px_20px,20px_20px]"
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
        class: "bg-background bg-[linear-gradient(90deg,transparent_79px,#ef4444_2px,transparent_81px),linear-gradient(#cbd5e1_1px,transparent_0)] bg-[size:100%_1.5em]"
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
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col rounded-3xl gap-y-4">
            <div className="p-1.5 flex gap-y-1 flex-col items-center bg-card/80 backdrop-blur-xs rounded-3xl border border-border shadow-xl">
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

                <div className="h-px w-8 bg-foreground my-1 " />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="relative">
                            <ToolButton
                                label="Insert"
                                icon={Plus}
                                onClick={() => { }}
                                isActive={canvasState.mode === CanvasMode.Inserting && [LayerType.Text, LayerType.LatexText, LayerType.Note].includes(canvasState.layerType!)}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="ml-2 p-2 gap-y-1 flex flex-col">
                        <DropdownMenuItem
                            onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text })}
                        >
                            <Type className="h-4 w-4 mr-2" /> Text
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.LatexText })}
                        >
                            <Pi className="h-4 w-4 mr-2" /> Math Formula
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note })}
                        >
                            <StickyNote className="h-4 w-4 mr-2" /> Sticky Note
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="relative">
                            <ToolButton
                                label="Shapes"
                                icon={Shapes}
                                onClick={() => { }}
                                isActive={
                                    canvasState.mode === CanvasMode.Inserting &&
                                    [
                                        LayerType.Rectangle,
                                        LayerType.Ellipse,
                                        LayerType.Triangle,
                                        LayerType.Diamond,
                                        LayerType.Hexagon,
                                        LayerType.Pentagon,
                                        LayerType.Star,
                                    ].includes(canvasState.layerType!)
                                }
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="ml-2 p-2 gap-y-1 flex flex-col">
                        <DropdownMenuItem onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Rectangle })}>
                            <Square className="h-4 w-4 mr-2" /> Rectangle
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse })}>
                            <Circle className="h-4 w-4 mr-2" /> Ellipse
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Triangle })}>
                            <Triangle className="h-4 w-4 mr-2" /> Triangle
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Diamond })}>
                            <Diamond className="h-4 w-4 mr-2" /> Diamond
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Pentagon })}>
                            <Pentagon className="h-4 w-4 mr-2" /> Pentagon
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Hexagon })}>
                            <Hexagon className="h-4 w-4 mr-2" /> Hexagon
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Star })}>
                            <Star className="h-4 w-4 mr-2" /> Star
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="relative">
                            <ToolButton
                                label="Drawing"
                                icon={LineSquiggle}
                                onClick={() => { }}
                                isActive={canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Line}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="ml-2 p-2 gap-y-1 flex flex-col">
                        <DropdownMenuItem
                            onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                        >
                            <Pencil className="h-4 w-4 mr-2" /> Pencil
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setCanvasState({ mode: CanvasMode.Line })}
                        >
                            <Slash className="h-4 w-4 mr-2" /> Line
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-px w-[80%] bg-foreground my-1" />
                <ToolButton
                    label="Eraser"
                    icon={EraserIcon}
                    onClick={() => setCanvasState({ mode: CanvasMode.Erasing })}
                    isActive={canvasState.mode === CanvasMode.Erasing}
                />
                <div className="h-px w-[80%] bg-foreground my-1" />

                <Dialog>
                    <DialogTrigger asChild>
                        <ToolButton
                            label="Canvas Settings"
                            icon={Settings2}
                            onClick={() => { }}
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground">Canvas Settings</DialogTitle>
                            <DialogDescription className="text-primary/70">
                                Change the settings of your canvas
                            </DialogDescription>
                        </DialogHeader>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => { }}
                                    variant={"ghost"}
                                >
                                    <ImageIcon />
                                    Canvas Background
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xs border-border shadow-2xl rounded-3xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-foreground">Canvas Background</DialogTitle>
                                    <DialogDescription className="text-primary/70">
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
                                        ${bgMode === mode ? "border-primary shadow-md" : "border-border"}
                                        ${BG_CONFIG[mode].class}
                                    `}>
                                                {bgMode === mode && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                                                        <Check className="h-8 w-8 text-primary drop-shadow-sm" />
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${bgMode === mode ? "text-primary" : "text-muted-foreground"
                                                }`}>
                                                {BG_CONFIG[mode].name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"ghost"}>
                                    <Keyboard className="h-5 w-5" />
                                    Hotkeys
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md bg-background border-border">
                                <DialogHeader>
                                    <DialogTitle className="text-foreground">Keyboard Shortcuts</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6 py-4">
                                    {shortcutGroups.map((group) => (
                                        <div key={group.group}>
                                            <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">
                                                {group.group}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {group.items.map((item) => (
                                                    <div
                                                        key={item.label}
                                                        className="flex items-center justify-between p-2 rounded-md bg-secondary/50 border border-border/50"
                                                    >
                                                        <span className="text-sm text-foreground/80">{item.label}</span>
                                                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                                                            {item.key}
                                                        </kbd>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant={"ghost"}
                        >
                            <ModeToggle />
                            Theme
                        </Button>
                    </DialogContent>

                </Dialog>

            </div >

            <div className="p-1.5 flex gap-y-1 flex-col items-center bg-card/80 backdrop-blur-xs rounded-3xl border border-border shadow-xl">
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
        </div >
    );
};

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-card h-112.5 w-14 shadow-xl rounded-3xl border border-border animate-pulse" />
    );
};