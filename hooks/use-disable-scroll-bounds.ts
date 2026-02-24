import { useEffect } from "react"

export const useDisableScrollBounds = () => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden", "overflow-none");
        return () => {
            document.body.classList.remove("overflow-hidden", "overflow-none");
        };
    }, []);
};