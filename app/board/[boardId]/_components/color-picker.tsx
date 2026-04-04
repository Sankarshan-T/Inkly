"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Plus } from "lucide-react";
import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

interface ColorPickerProps {
    onChange: (color: Color) => void;
}

export const ColorPicker = ({
    onChange,
}: ColorPickerProps) => {
    return (
        <div className="flex flex-wrap gap-2 items-center max-w-41 pr-2 mr-3 border-r border-neutral-200">
            <ColorButton color={{ r: 25, g: 114, b: 120 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 202, b: 58 }} onClick={onChange} />
            <ColorButton color={{ r: 138, g: 201, b: 38 }} onClick={onChange} />
            <ColorButton color={{ r: 25, g: 130, b: 196 }} onClick={onChange} />
            <ColorButton color={{ r: 106, g: 76, b: 147 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 89, b: 94 }} onClick={onChange} />
            <ColorButton color={{ r: 235, g: 242, b: 250 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 67, g: 123, b: 120 }} onClick={onChange} />
            <ColorButton color={{ r: 190, g: 100, b: 10 }} onClick={onChange} />
            <ColorButton color={{ r: 100, g: 0, b: 0 }} onClick={onChange} />
            <CustomColorButton onChange={onChange} />
        </div>
    );
};

const CustomColorButton = ({
    onChange
}: {
    onChange: (color: Color) => void
}) => {
    const [hex, setHex] = useState("#ffffff");

    const handleHexChange = (newHex: string) => {
        setHex(newHex);
        const r = parseInt(newHex.slice(1, 3), 16);
        const g = parseInt(newHex.slice(3, 5), 16);
        const b = parseInt(newHex.slice(5, 7), 16);
        onChange({ r, g, b });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition">
                    <div
                        className="h-8 w-8 rounded-md border border-neutral-300 flex items-center justify-center"
                        style={{ backgroundColor: hex }}
                    >
                        <Plus className="w-4 h-4 text-neutral-500 mix-blend-difference" />
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-3 bg-white border-none shadow-xl">
                <HexColorPicker color={hex} onChange={handleHexChange} />
                <div className="mt-3 flex items-center gap-x-2">
                    <div
                        className="w-4 h-4 rounded-sm border border-neutral-200"
                        style={{ backgroundColor: hex }}
                    />
                    <p className="text-xs font-mono uppercase text-neutral-500">
                        {hex}
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    );
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({
    onClick,
    color,
}: ColorButtonProps) => {
    return (
        <button
            className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div
                className="h-8 w-8 rounded-md border border-neutral-300"
                style={{ background: colorToCss(color) }}
            />
        </button>
    );
};