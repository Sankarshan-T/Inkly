"use client";

import { useMutation } from "@liveblocks/react";

export const useClearCanvas = () => {
    return useMutation(({ storage, setMyPresence }) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");

        for (const id of liveLayerIds.toImmutable()) {
            liveLayers.delete(id);
        }

        liveLayerIds.clear();

        setMyPresence({ selection: [] }, { addToHistory: true });
    }, []);
};