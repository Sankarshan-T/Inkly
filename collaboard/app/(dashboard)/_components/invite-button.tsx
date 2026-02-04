import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return(
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Invite Members
            </Button>
        </DialogTrigger>
        <DialogContent style={{maxWidth: "none", width: "fit-content"}} className="p-0 bg-transparent border-none">
            <OrganizationProfile routing="hash"/>
        </DialogContent>
    </Dialog>
  )
}
