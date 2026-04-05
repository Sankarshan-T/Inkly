import { SignInButton } from "@clerk/nextjs";

export const SignInToInkly = () => (
    <SignInButton mode="modal">
        <button className="bg-primary/10 text-primary font-bold px-5 py-2 rounded-xl transition-all duration-200 hover:bg-primary/20 hover:scale-105 active:scale-95 shadow-md">
            Sign In
        </button>
    </SignInButton>
);