"use client";

import { useState } from "react";
import { Path } from "./path";
import { Pencil, Slash, RotateCcw } from "lucide-react";

export const PreviewCanvas = () => {
    const [paths, setPaths] = useState<any[]>([]);
    const [currentPath, setCurrentPath] = useState<number[][] | null>(null);
    const [mode, setMode] = useState<"pencil" | "line">("pencil");

    const onPointerDown = (e: React.PointerEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const point = [e.clientX - rect.left, e.clientY - rect.top, e.pressure];
        setCurrentPath([point]);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!currentPath) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const point = [e.clientX - rect.left, e.clientY - rect.top, e.pressure];

        if (mode === "pencil") {
            setCurrentPath([...currentPath, point]);
        } else {
            setCurrentPath([currentPath[0], point]);
        }
    };

    const onPointerUp = () => {
        if (currentPath && currentPath.length > 1) {
            setPaths([...paths, currentPath]);
        }
        setCurrentPath(null);
    };

    return (
        <div className="relative w-[90%] h-135 bg-white rounded-3xl shadow-2xl border-8 border-indigo-900/10 overflow-hidden group">
            
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-indigo-100 shadow-xl">
                <button 
                    onClick={() => setMode("pencil")}
                    className={`p-3 rounded-xl transition-all ${mode === "pencil" ? "bg-indigo-600 text-white" : "hover:bg-indigo-50 text-indigo-600"}`}
                >
                    <Pencil size={20} />
                </button>
                <button 
                    onClick={() => setMode("line")}
                    className={`p-3 rounded-xl transition-all ${mode === "line" ? "bg-indigo-600 text-white" : "hover:bg-indigo-50 text-indigo-600"}`}
                >
                    <Slash size={20} />
                </button>
                <div className="w-px bg-indigo-100 mx-1" />
                <button 
                    onClick={() => setPaths([])}
                    className="p-3 rounded-xl hover:bg-red-50 text-red-500 transition-all"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <svg 
                className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[30px_30px] touch-none cursor-crosshair"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                {paths.map((points, i) => (
                    <Path key={i} points={points} fill="#4f46e5" x={0} y={0} />
                ))}
                {currentPath && (
                    <Path points={currentPath} fill="#4f46e5" x={0} y={0} />
                )}
            </svg>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-indigo-900/40 font-medium pointer-events-none text-center">
                {mode === "pencil" ? "Freehand Mode " : "Straight Line Mode "}
                <br/>
                This is just a preview. More features can be unlocked after signing up
            </div>
        </div>
    );
};