import { useMutation, useSelf } from "@liveblocks/react"

export const useDeleteLayers = () => {
    const selection = useSelf((me) => me.presence.selection) ?? [];
    const info = useSelf((me) => me.info);
    const selfId = useSelf((me) => me.id);

    return useMutation(({ storage }) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");

        const isAdmin = info?.role === "admin";

        for (const id of selection) {
            const layer = liveLayers.get(id);

            if (layer) {
                if (isAdmin || layer.get("authorId") === selfId) {
                    liveLayers.delete(id);
                    const index = liveLayerIds.indexOf(id);
                    if (index !== -1) {
                        liveLayerIds.delete(index);
                    }
                } else {
                    console.warn("You do not have permission to delete this layer.");
                }
            }
        }
    }, [selection, info, selfId]);
};