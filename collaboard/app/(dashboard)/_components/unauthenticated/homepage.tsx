import { SignInToInkly } from "./sign-in"

export const HomePage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center p-4 bg-slate-50">
            <nav className="mt-4 h-16 w-full max-w-6xl rounded-2xl bg-blue-900/90 backdrop-blur-md flex items-center justify-between px-8 text-white shadow-xl shadow-blue-200/50 border border-blue-400/20">
                
                <div className="text-2xl font-bold flex items-center gap-3 tracking-tight">
                    <img src="./logo.svg" className="h-9 w-9" alt="Inkly Logo" />
                    <span>Inkly</span>
                </div>

                <SignInToInkly />
            </nav>
            
            <main className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold text-blue-900">Write with Inkly.</h1>
            </main>
        </div>
    )
}