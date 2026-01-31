"use client"

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Authenticated>
        <div className="flex flex-col gap-y-4">
            <div>
              Authenticated!!
            </div>
            <div>
              <UserButton />
            </div>
        </div>
      </Authenticated>

      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>

    </>
  );
};
