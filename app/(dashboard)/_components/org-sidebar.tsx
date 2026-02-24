"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const OrgSidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");

    return(
        <div className="hidden lg:flex flex-col space-y-6 w-51.5 pl-5 pr-5 pt-5 border-r-2">
            <Link href='/'>
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        height={40}
                        width={40} 
                    />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className,
                    )}>
                        Inkly
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "50px"
                        },
                        button: {
                            width: "100%",
                            height: "100%",
                            justifyContent: "space-between",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                        },
                        organizationPreview: {
                            height: "100%",
                        },
                        organizationPreviewAvatarContainer: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: "100%",
                        },
                        organizationPreviewAvatarBox: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'center',
                            height: "100%",
                            width: "35px",
                        },
                        avatarImage: {
                            height: "100%",
                        },
                        organizationPreviewMainIdentifier: {
                            fontSize: "1rem",
                        },
                    }
                }}
            />
            <div className="space-y-1 w-full">
                <Button
                    variant={favorites ? "outline" : "secondary"}
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full h-12.5"
                >
                    <Link href="/">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team Boards
                    </Link>
                </Button>
                <Button
                    variant={favorites ? "secondary" : "outline"}
                    asChild
                    size="lg"
                    className="font-normal justify-start px-2 w-full h-12.5"
                >
                    <Link href={{
                        pathname: "/",
                        query: { favorites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        Favorite Boards
                    </Link>
                </Button>
            </div>
        </div>
    );
};