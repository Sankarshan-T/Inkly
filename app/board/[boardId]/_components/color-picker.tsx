"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({
    onChange,
}: ColorPickerProps) => {
    return (
        <div className="flex flex-wrap gap-2 items-center max-w-41 pr-2 mr-3 border-r border-neutral-200">
            <ColorButton color={{r: 25, g: 114, b:120 }} onClick={onChange}/>
            <ColorButton color={{r: 255, g: 202, b:58 }} onClick={onChange}/>
            <ColorButton color={{r: 138, g: 201, b:38 }} onClick={onChange}/>
            <ColorButton color={{r: 25, g: 130, b:196 }} onClick={onChange}/>
            <ColorButton color={{r: 106, g: 76, b:147 }} onClick={onChange}/>
            <ColorButton color={{r: 255, g: 89, b:94 }} onClick={onChange}/>
            <ColorButton color={{r: 235, g: 242, b:250 }} onClick={onChange}/>
            <ColorButton color={{r: 0, g: 0, b:0 }} onClick={onChange}/>
        </div>
    );
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
};

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