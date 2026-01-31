"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export const Navbar = () => {
    return(
        <div className="flex items-center gap-x-4 p-5 bg-red-400">
            <div className="hidden lg:flex lg:flex-1 bg-yellow-500">
                Search
                {/* Search */}
            </div>
            <UserButton />           
        </div>
    );
};