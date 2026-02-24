"use client";

import { RenameModal } from "@/components/modals/rename-modal";
import { useEffect, useState } from "react";


export const ModalProvider = () => {
    const [ ismounted, setIsMounted ] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!ismounted) {
        return null;
    }

    return(
        <>
            <RenameModal />
        </>
    )
}
