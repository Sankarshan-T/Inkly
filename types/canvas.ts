export type Color = {
    r: number;
    g: number;
    b: number;
};

export type Camera = {
    x: number;
    y: number;
    zoom: number;
};

export type BackgroundMode =
    | "dots" | "grid" | "blueprint" | "legal" | "graph"
    | "isometric" | "carbon" | "slate" | "paper" | "notebook";

export enum LayerType {
    Rectangle,
    Ellipse,
    Triangle,
    Diamond,
    Pentagon,
    Hexagon,
    Star,
    Text,
    Note,
    LatexText,
    Path,
}

export type RectangleLayer = {
    type: LayerType.Rectangle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
    outlineOnly?: boolean;
    strokeWidth?: number;
    authorId?: string;
};

export type EllipseLayer = {
    type: LayerType.Ellipse;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
    outlineOnly?: boolean;
    strokeWidth?: number;
    authorId?: string;
};

export type TriangleLayer = {
    type: LayerType.Triangle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
    outlineOnly?: boolean;
    strokeWidth?: number;
    authorId?: string;
};

export type DiamondLayer = {
    type: LayerType.Diamond;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    authorId?: string;
};

export type HexagonLayer = {
    type: LayerType.Hexagon;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    authorId?: string;
};

export type StarLayer = {
    type: LayerType.Star;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    authorId?: string;
};

export type PentagonLayer = {
    type: LayerType.Pentagon;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    authorId?: string;
};

export type PathLayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    points: number[][];
    value?: string;
    authorId?: string;
};

export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
    authorId?: string;
};

export type LatexTextLayer = {
    type: LayerType.LatexText;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
    authorId?: string;
};

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    value?: string;
    authorId?: string;
};

export type Point = {
    x: number;
    y: number;
};

export type XYWH = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
};

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil,
    Line,
    Panning,
    Erasing,
};

export type CanvasState =
    | { mode: CanvasMode.None }
    | { mode: CanvasMode.Panning, origin: Point }
    | { mode: CanvasMode.SelectionNet, origin: Point, current?: Point }
    | { mode: CanvasMode.Translating, current: Point }
    | { mode: CanvasMode.Inserting, layerType: LayerType }
    | { mode: CanvasMode.Pencil }
    | { mode: CanvasMode.Line }
    | { mode: CanvasMode.Erasing }
    | {
        mode: CanvasMode.Pressing,
        origin: Point,
        current?: Point,
        layerType?: LayerType
    }
    | {
        mode: CanvasMode.Resizing,
        initialBounds: XYWH,
        corner: Side
    };

export type Layer =
    | RectangleLayer
    | EllipseLayer
    | PathLayer
    | TextLayer
    | NoteLayer
    | LatexTextLayer
    | TriangleLayer
    | DiamondLayer
    | HexagonLayer
    | StarLayer
    | PentagonLayer;