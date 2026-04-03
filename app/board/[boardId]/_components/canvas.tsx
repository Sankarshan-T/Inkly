"use client";

import { Path } from "./path";
import { Info } from "./info";
import { nanoid } from "nanoid";
import { Toolbar } from "./toolbar";
import { Participants } from "./participants";
import { SelectionBox } from "./selection-box";
import { LayerPreview } from "./layer-preview";
import { LiveObject } from "@liveblocks/client";
import { SelectionTools } from "./selection-tools";
import { CursorsPresence } from "./cursors-presence";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useDisableScrollBounds } from "@/hooks/use-disable-scroll-bounds";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useHistory,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStorage,
    useOthersMapped,
    useSelf
} from "@liveblocks/react";

import {
    colorToCss,
    connectionIdToColor,
    findIntersectingLayersWithRectangle,
    penPointsToPath,
    pointerEventToCanvasPoint,
    resizeBounds
} from "@/lib/utils";

import {
    CanvasState,
    CanvasMode,
    Camera,
    Color,
    LayerType,
    Point,
    Side,
    XYWH,
    BackgroundMode
} from "@/types/canvas";

const MAX_LAYERS = 1000;

interface CanvasProps {
    boardId: string;
};

export const Canvas = ({
    boardId,
}: CanvasProps) => {
    const info = useSelf((me) => me.info);
    const userRole = info?.role;
    const isEditor = userRole === "editor";
    const isViewer = userRole === "viewer";

    const [bgMode, setBgMode] = useState<BackgroundMode>("dots");
    const getBgClass = () => BG_PATTERNS[bgMode] || "bg-white";

    const layerIds = useStorage((root) => root.layerIds);
    const pencilDraft = useSelf((me) => me.presence.pencilDraft);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
    const selections = useOthersMapped((other) => other.presence.selection);
    const deleteLayers = useDeleteLayers();

    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 25,
        g: 114,
        b: 120,
    });

    const BG_PATTERNS: Record<BackgroundMode, string> = {
        dots: "bg-[radial-gradient(#94a3b8_2px,transparent_2px)] bg-[size:30px_30px]",
        grid: "bg-[linear-gradient(to_right,#64748b40_1.5px,transparent_1.5px),linear-gradient(to_bottom,#64748b40_1.5px,transparent_1.5px)] bg-[size:40px_40px]",
        blueprint: "bg-[#1a365d] bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px]",
        legal: "bg-[#fef9c3] bg-[linear-gradient(#94a3b8_1px,transparent_1px)] bg-[size:100%_24px]",
        graph: "bg-white bg-[linear-gradient(#cbd5e1_1.5px,transparent_1.5px),linear-gradient(90deg,#cbd5e1_1.5px,transparent_1.5px),linear-gradient(#f1f5f9_1px,transparent_1px),linear-gradient(90deg,#f1f5f9_1px,transparent_1px)] bg-[size:100px_100px,100px_100px,20px_20px,20px_20px]",
        isometric: "bg-white bg-[radial-gradient(#64748b_1.5px,transparent_1.5px),radial-gradient(#64748b_1.5px,transparent_1.5px)] bg-[size:40px_40px] [background-position:0_0,20px_20px]",
        carbon: "bg-[#121212] bg-[repeating-linear-gradient(45deg,#1f1f1f_0,#1f1f1f_1px,transparent_0,transparent_10px)]",
        slate: "bg-[#f8fafc]",
        paper: "bg-[#faf9f6] [background-image:url('https://www.transparenttextures.com/patterns/felt.png')]",
        notebook: "bg-white bg-[linear-gradient(90deg,transparent_79px,#ef4444_2px,transparent_81px),linear-gradient(#cbd5e1_1px,transparent_0)] bg-[size:100%_1.5em]"
    };

    useDisableScrollBounds();
    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertlayer = useMutation((
        { storage, setMyPresence, self },
        layerType: LayerType,
        position: Point,
        width: number = 100,
        height: number = 100,
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) return;

        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();

        const layerData = {
            type: layerType,
            x: position.x,
            y: position.y,
            height: height,
            width: width,
            fill: lastUsedColor,
            authorId: self.id,
        } as any;

        const layer = new LiveObject(layerData);

        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
    }, [lastUsedColor]);

    const translateSelectedLayers = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Translating) return;

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y
        };

        const liveLayers = storage.get("layers");

        for (const id of self.presence.selection) {
            const layer = liveLayers.get(id);
            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y,
                });
            };
        }

        setCanvasState({ mode: CanvasMode.Translating, current: point });
    }, [canvasState]);

    const unselectLayers = useMutation((
        { self, setMyPresence }
    ) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: [] }, { addToHistory: true });
        }
    }, []);

    const updateSelectionNet = useMutation((
        { storage, setMyPresence },
        current: Point,
        origin: Point,
    ) => {
        const layers = storage.get("layers").toImmutable();
        const layerIds = storage.get("layerIds").toImmutable();
        setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

        const ids = findIntersectingLayersWithRectangle(
            layerIds,
            layers,
            origin,
            current
        );

        setMyPresence({ selection: ids });
    }, [layerIds]);

    const startSelectionNet = useCallback((
        current: Point,
        origin: Point,
    ) => {
        if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
            setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
        }
    }, []);

    const continueDrawing = useMutation((
        { self, setMyPresence },
        point: Point,
        e: React.PointerEvent,
    ) => {
        const { pencilDraft } = self.presence;
        if (e.buttons !== 1 || pencilDraft == null) return;

        if (canvasState.mode === CanvasMode.Pencil) {
            setMyPresence({
                cursor: point,
                pencilDraft: pencilDraft.length === 1 &&
                    pencilDraft[0][0] === point.x &&
                    pencilDraft[0][1] === point.y
                    ? pencilDraft
                    : [...pencilDraft, [point.x, point.y, e.pressure]],
            });
        } else if (canvasState.mode === CanvasMode.Line) {
            setMyPresence({
                cursor: point,
                pencilDraft: [
                    pencilDraft[0],
                    [point.x, point.y, e.pressure]
                ],
            });
        }
    }, [canvasState.mode]);

    const insertPath = useMutation((
        { storage, setMyPresence, self }
    ) => {
        const liveLayers = storage.get("layers");
        const { pencilDraft } = self.presence;

        if (
            pencilDraft == null ||
            pencilDraft.length < 2 ||
            liveLayers.size >= MAX_LAYERS
        ) {
            setMyPresence({ pencilDraft: null });
            return;
        }

        const id = nanoid();
        liveLayers.set(
            id,
            new LiveObject(penPointsToPath(
                pencilDraft,
                lastUsedColor,
                self.id,
            )),
        );

        const liveLayerIds = storage.get("layerIds");
        liveLayerIds.push(id);

        setMyPresence({ pencilDraft: null });
        setCanvasState({ mode: canvasState.mode as any });

    }, [lastUsedColor, canvasState]);

    const startDrawing = useMutation((
        { setMyPresence },
        point: Point,
        pressure: number,
    ) => {
        setMyPresence({
            pencilDraft: [[point.x, point.y, pressure]],
            penColor: lastUsedColor,
        })
    }, [lastUsedColor]);

    const resizeSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Resizing) return;

        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point,
        );

        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0]);

        if (layer) {
            layer.update(bounds);
        };
    }, [canvasState]);

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,
    ) => {
        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        });
    }, [history]);

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => {
            const zoomFactor = Math.pow(0.999, e.deltaY);
            const newZoom = Math.min(Math.max(camera.zoom * zoomFactor, 0.1), 10);
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const dx = (mouseX - camera.x) * (1 - zoomFactor);
            const dy = (mouseY - camera.y) * (1 - zoomFactor);

            return {
                zoom: newZoom,
                x: camera.x + dx,
                y: camera.y + dy,
            };
        });
    }, []);

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Panning) {
            setCamera((camera) => ({
                x: camera.x + e.movementX,
                y: camera.y + e.movementY,
                zoom: camera.zoom,
            }));
        }

        else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current);
        }

        else if (canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayers(current);
        }

        else if (canvasState.mode === CanvasMode.Pressing) {
            setCanvasState({
                ...canvasState,
                current: current,
            });

            if (!("layerType" in canvasState)) {
                startSelectionNet(current, canvasState.origin);
            }
        }

        else if (canvasState.mode === CanvasMode.SelectionNet) {
            updateSelectionNet(current, canvasState.origin);
        }

        else if (
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Line
        ) {
            continueDrawing(current, e);
        }

        setMyPresence({ cursor: current });
    }, [
        camera,
        canvasState,
        resizeSelectedLayer,
        translateSelectedLayers,
        startSelectionNet,
        updateSelectionNet,
        continueDrawing,
    ]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = pointerEventToCanvasPoint(e, camera);
        if (isViewer && e.button !== 1) return;

        if (e.button === 1) {
            setCanvasState({ mode: CanvasMode.Panning, origin: point });
            return;
        }

        if (canvasState.mode === CanvasMode.Inserting) {
            setCanvasState({
                mode: CanvasMode.Pressing,
                origin: point,
                current: point,
                layerType: canvasState.layerType
            } as any);
            return;
        }

        if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Line) {
            startDrawing(point, e.pressure);
            return;
        }

        setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    }, [camera, canvasState, isViewer, startDrawing, setCanvasState]);

    const onPointerUp = useMutation((
        { storage, self, setMyPresence },
        e: React.PointerEvent
    ) => {
        const { selection } = self.presence;
        const layers = storage.get("layers");
        const isAdmin = self.info?.role === "admin";
        const selfId = self.id;
        const point = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.SelectionNet && selection) {
            const filteredSelection = selection.filter((id) => {
                if (isAdmin) return true;
                const layer = layers.get(id);
                return layer?.get("authorId") === selfId;
            });
            setMyPresence({ selection: filteredSelection });
        }

        if (canvasState.mode === CanvasMode.Pressing) {
            if ("layerType" in canvasState) {
                const { origin, layerType } = canvasState as any;

                const x = Math.min(origin.x, point.x);
                const y = Math.min(origin.y, point.y);
                const width = Math.abs(origin.x - point.x);
                const height = Math.abs(origin.y - point.y);

                if (width < 5 && height < 5) {
                    insertlayer(layerType, { x: point.x - 50, y: point.y - 50 }, 100, 100);
                } else {
                    insertlayer(layerType, { x, y }, width, height);
                }
            } else {
                unselectLayers();
                setCanvasState({ mode: CanvasMode.None });
            }
        }
        else if (
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Line
        ) {
            insertPath();
        }
        else if (canvasState.mode === CanvasMode.Inserting) {
            insertlayer((canvasState as any).layerType, point);
        }
        else {
            setCanvasState({ mode: CanvasMode.None });
        }

        history.resume();
    }, [
        camera,
        canvasState,
        history,
        insertlayer,
        unselectLayers,
        insertPath,
        setCanvasState,
    ]);

    const onLayerPointerDown = useMutation((
        { self, setMyPresence, storage },
        e: React.PointerEvent,
        layerId: string,
    ) => {
        if (isViewer) return;

        e.stopPropagation();

        const layer = storage.get("layers").get(layerId);
        if (isEditor && layer?.get("authorId") !== self.id) return;

        if (
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Inserting ||
            canvasState.mode === CanvasMode.Line
        ) {
            return;
        }

        history.pause();
        const point = pointerEventToCanvasPoint(e, camera);

        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true });
        }

        setCanvasState({ mode: CanvasMode.Translating, current: point });
    }, [setCanvasState, camera, history, canvasState.mode, isViewer]);

    const duplicateLayers = useMutation(({ storage, self, setMyPresence }) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");
        const selection = self.presence.selection;
        const newIds: string[] = [];

        selection.forEach((id) => {
            const layer = liveLayers.get(id);
            if (layer) {
                const newId = nanoid();
                const layerData = layer.toObject();
                const duplicate = new LiveObject({
                    ...layerData,
                    x: layerData.x + 20,
                    y: layerData.y + 20,
                });
                liveLayers.set(newId, duplicate);
                liveLayerIds.push(newId);
                newIds.push(newId);
            }
        });
        setMyPresence({ selection: newIds }, { addToHistory: true });
    }, []);

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};
        for (const user of selections) {
            const [connectionId, selection] = user;
            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
            }
        }
        return layerIdsToColorSelection;
    }, [selections])

    const getCursor = () => {
        switch (canvasState.mode) {
            case CanvasMode.Panning:
            case CanvasMode.Translating:
                return "cursor-grabbing";
            case CanvasMode.Inserting:
            case CanvasMode.Line:
            case CanvasMode.Pencil:
                return "cursor-crosshair";
            case CanvasMode.Resizing:
                return "cursor-nwse-resize";
            default:
                return "cursor-default";
        }
    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) e.preventDefault();
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    useEffect(() => {
        const preventSafariZoom = (e: any) => e.preventDefault();
        window.addEventListener('gesturestart', preventSafariZoom);
        return () => window.removeEventListener('gesturestart', preventSafariZoom);
    }, []);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (isViewer) return;
            const isTyping = (document.activeElement as HTMLElement)?.isContentEditable;
            if (isTyping) return;

            switch (e.key) {
                case "Delete":
                    deleteLayers();
                    break;
                case "z":
                    if (e.ctrlKey || e.metaKey) {
                        if (e.shiftKey) history.redo();
                        else history.undo();
                    }
                    break;
                case "d":
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        duplicateLayers();
                    }
                    break;
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [deleteLayers, history, isViewer, duplicateLayers]);

    return (
        <main
            className={`h-full w-full relative touch-none transition-colors duration-500 ${getBgClass()} ${getCursor()}`}
            style={{ touchAction: 'none', overscrollBehavior: 'none' }}
        >
            <Info boardId={boardId} />
            <Participants />
            {!isViewer && (
                <>
                    <Toolbar
                        canvasState={canvasState}
                        setCanvasState={setCanvasState}
                        canRedo={canRedo}
                        canUndo={canUndo}
                        undo={history.undo}
                        redo={history.redo}
                        bgMode={bgMode}
                        setBgMode={setBgMode}
                    />
                    <SelectionTools
                        camera={camera}
                        setLastUsedColor={setLastUsedColor}
                    />
                </>
            )}

            <svg
                className="h-screen w-screen"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
                        transition: "transform 0.1s ease-out"
                    }}
                >
                    {canvasState.mode === CanvasMode.Pressing &&
                        canvasState.current &&
                        canvasState.origin &&
                        "layerType" in canvasState && (
                            <g className="pointer-events-none opacity-50">
                                {(() => {
                                    const x = Math.min(canvasState.origin.x, canvasState.current.x);
                                    const y = Math.min(canvasState.origin.y, canvasState.current.y);
                                    const width = Math.abs(canvasState.origin.x - canvasState.current.x);
                                    const height = Math.abs(canvasState.origin.y - canvasState.current.y);
                                    const fill = colorToCss(lastUsedColor);

                                    switch (canvasState.layerType) {
                                        case LayerType.Rectangle:
                                            return (
                                                <rect
                                                    x={x} y={y} width={width} height={height}
                                                    fill={fill} stroke="#3b82f6" strokeWidth="1"
                                                />
                                            );
                                        case LayerType.Ellipse:
                                            return (
                                                <ellipse
                                                    cx={x + width / 2} cy={y + height / 2}
                                                    rx={width / 2} ry={height / 2}
                                                    fill={fill} stroke="#3b82f6" strokeWidth="1"
                                                />
                                            );
                                        case LayerType.Triangle:
                                            return (
                                                <polygon
                                                    points={`${x + width / 2},${y} ${x},${y + height} ${x + width},${y + height}`}
                                                    fill={fill} stroke="#3b82f6" strokeWidth="1"
                                                />
                                            );
                                        case LayerType.Note:
                                            return (
                                                <rect
                                                    x={x} y={y} width={width} height={height}
                                                    fill="#fef08a" stroke="#eab308" strokeWidth="1"
                                                />
                                            );
                                        // Add more cases for Diamond, Star, etc. as needed
                                        default:
                                            return (
                                                <rect
                                                    x={x} y={y} width={width} height={height}
                                                    fill="transparent" stroke="#3b82f6" strokeDasharray="5,5"
                                                />
                                            );
                                    }
                                })()}
                            </g>
                        )}

                    {layerIds?.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdsToColorSelection[layerId]}
                            isDrawing={
                                canvasState.mode === CanvasMode.Pencil ||
                                canvasState.mode === CanvasMode.Line
                            }
                        />
                    ))}

                    <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />

                    {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
                        <rect
                            className="fill-blue-500/5 stroke-blue-500 stroke-1"
                            x={Math.min(canvasState.origin.x, canvasState.current.x)}
                            y={Math.min(canvasState.origin.y, canvasState.current.y)}
                            width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                            height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                        />
                    )}

                    <CursorsPresence />

                    {pencilDraft != null && pencilDraft.length > 0 && (
                        <Path
                            points={pencilDraft}
                            fill={colorToCss(lastUsedColor)}
                            x={0}
                            y={0}
                        />
                    )}
                </g>
            </svg>
        </main >
    );
};