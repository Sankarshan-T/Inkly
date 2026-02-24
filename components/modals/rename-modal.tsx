"use client";

import { FormEventHandler, useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle
} from "@/components/ui/dialog"
import { useRenameModal } from "@/store/use-renamemodal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update);    

    const {
        isOpen,
        onClose,
        inititalValues
    } = useRenameModal();
    
    const [title, setTitle] = useState(inititalValues.title);

    useEffect(() => {
        setTitle(inititalValues.title);
    }, [inititalValues.title]);

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({
            id: inititalValues.id,
            title
        })
        .then(() => {
            toast.success("Board Renamed!")
            onClose();
        })
        .catch(() => toast.error("Failed to rename board"))
    }; 

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board Title..."
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"outline"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
