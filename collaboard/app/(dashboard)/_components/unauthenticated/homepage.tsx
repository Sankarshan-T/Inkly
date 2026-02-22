import { ArrowBigDown, Globe, Layers, MousePointer2, PencilLine, Stars, User } from "lucide-react"
import { SignInToInkly } from "./sign-in"

export const HomePage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-50 overflow-y-auto scroll-smooth">
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 h-18 w-[90%] max-w-6xl rounded-2xl bg-indigo-900 backdrop-blur-md flex items-center justify-between px-8 text-white shadow-xl">

                <div className="text-4xl font-bold flex items-center gap-3 tracking-tight">
                    <img src="./logo.svg" className="h-9 w-9" alt="Inkly Logo" />
                    <span>Inkly</span>
                </div>

                <SignInToInkly />
            </nav>

            <main className="h-screen w-full flex flex-col items-center justify-center text-center px-6 ">
                <h1 className="mt-15 text-5xl md:text-6xl font-black text-indigo-950 tracking-tight">
                    Your ideas, <span className="text-indigo-600">doodled</span> here.
                </h1>

                <p className="mt-6 text-xl md:text-2xl font-light text-indigo-800/80 max-w-2xl leading-relaxed">
                    A minimalist collaborative whiteboard.
                    <span className="mt-2 block font-medium text-indigo-800">Powerful features, zero cost.</span>
                </p>

                <p className="mt-5 text-xl md:text-2xl font-light text-indigo-800/80 max-w-2xl leading-relaxed">
                    Sign In now, and get started!
                </p>

                <a
                    className="mt-12 p-3 text-indigo-400 rounded-full border-2 border-transparent transition-all duration-300 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 animate-bounce cursor-pointer group"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <ArrowBigDown className="w-8 h-8 transition-transform group-hover:scale-110" />
                </a>
            </main>

            <section id="features" className="h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-white py-20 px-20">
                <h2 className="text-4xl font-bold text-blue-950 text-center">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 1 */}
                    <div className="p-8 rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <User size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-blue-950 mb-2">Real-time Collaboration</h3>
                        <p className="text-blue-800/70">Invite your team and work together with instant syncing.</p>
                    </div>

                    {/* 2 */}
                    <div className="p-8 rounded-3xl bg-white border border-red-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <PencilLine size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-red-950 mb-2">Various Elements</h3>
                        <p className="text-red-800/70">Add a variety of objects to your board like textboxes, rectangles, drawings and more!</p>
                    </div>

                    {/* 3 */}
                    <div className="p-8 rounded-3xl bg-white border border-amber-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <MousePointer2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-amber-950 mb-2">Live Previews and Tracking</h3>
                        <p className="text-amber-800/70">Track what your teammates do by seeing their cursors on your screen and see live previews.</p>
                    </div>

                    {/* 4 */}
                    <div className="p-8 rounded-3xl bg-white border border-green-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-green-950 mb-2">Organizations</h3>
                        <p className="text-green-800/70">Create organizations to add different teams and people to them, with separate boards and contents.</p>
                    </div>

                    {/* 5 */}
                    <div className="p-8 rounded-3xl bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Stars size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-indigo-950 mb-2">Favorites</h3>
                        <p className="text-indigo-800/70">Add boards to your favorites to access them with ease.</p>
                    </div>

                    {/* 6 */}
                    <div className="p-8 rounded-3xl bg-white border border-cyan-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-cyan-950 mb-2">Layers</h3>
                        <p className="text-cyan-800/70">With many layers in the board, control the z-index any layer!</p>
                    </div>
                </div>
            </section>

            <footer className="w-full py-10 text-center text-blue-900/30 font-medium bg-white">
                © 2026 Inkly. All doodles reserved. Made with 💖 by CoolCream
            </footer>
        </div>
    )
}