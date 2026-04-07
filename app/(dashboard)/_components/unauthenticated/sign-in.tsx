import { SignInButton } from "@clerk/nextjs";

export const SignInToInkly = () => (
    <SignInButton mode="modal">
        <button className="bg-secondary text-secondary-foreground font-bold px-5 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md">
            Sign In
        </button>
    </SignInButton>
);