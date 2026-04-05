"use client";

import { OrganizationSwitcher, UserButton, useAuth } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { ModeToggle } from "@/components/ui/theme-toggle";

export const Navbar = () => {
    const organization = useAuth();

    return (
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
                                border: "var(--border)",
                                justifyContent: "space-between",
                                backgroundColor: "var(--background)",
                                color: "var(--primary)",
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
            <ModeToggle />
            {organization && (<InviteButton />)}
            <UserButton />
        </div>
    );
};