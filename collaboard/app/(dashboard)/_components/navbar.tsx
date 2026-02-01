"use client";

import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { SearchInput } from "./search-input";

export const Navbar = () => {
    return(
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "376px",
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
            </div>
            <UserButton />           
        </div>
    );
};