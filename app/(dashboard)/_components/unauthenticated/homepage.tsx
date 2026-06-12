import { ArrowBigDown, Globe, Layers, MousePointer2, PencilLine, Stars, User } from "lucide-react";
import { SignInToInkly } from "./sign-in";
import { PreviewCanvas } from "./canvas-preview";
import Typewriter from 'typewriter-effect';

export const HomePage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col bg-background touch-none overflow-y-auto scroll-smooth">
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 h-18 w-[90%] max-w-6xl rounded-2xl bg-primary backdrop-blur-xs flex items-center justify-between px-8 text-primary-foreground shadow-xl">

                <div className="text-4xl font-bold flex items-center gap-3 tracking-tight">
                    <img src="./logo.svg" className="h-9 w-9" alt="Inkly Logo" />
                    <span>Inkly</span>
                </div>
                <div className="flex items-center gap-x-5">
                    <a href="#preview">Preview</a>
                    <a href="#features">Features</a>
                    <SignInToInkly />
                </div>

            </nav>

            <main className="h-screen w-full flex flex-col items-center justify-center text-center px-6 ">
                <h1 className="mt-15 text-5xl md:text-6xl font-black text-foreground tracking-tight flex items-center justify-center whitespace-nowrap">
                    <span>Your ideas,</span>
                    <span className="text-primary ml-1">
                        <Typewriter
                            options={{
                                strings: ['doodled', 'sketched', 'shared', ' inked'],
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 55,
                            }}
                        />
                    </span>
                    <span>here</span>
                </h1>

                <p className="mt-6 text-xl md:text-2xl font-light text-foreground/80 max-w-2xl leading-relaxed">
                    A minimalist collaborative whiteboard.
                    <span className="mt-2 block font-medium text-foreground">Powerful features, zero cost.</span>
                </p>
                <p className="mt-5 text-xl md:text-2xl font-light text-foreground/80 max-w-2xl leading-relaxed">
                    Try it out!
                </p>
                <a
                    className="mt-12 p-3 text-primary/60 rounded-full border-2 border-transparent transition-all duration-300 hover:text-primary hover:border-primary/20 hover:bg-primary/10 animate-bounce cursor-pointer group"
                    onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <ArrowBigDown className="w-8 h-8 transition-transform group-hover:scale-110" />
                </a>

            </main>

            <section id="preview" className="w-full h-screen flex justify-center items-center perspective-1000">
                <div className="animate-in fade-in zoom-in duration-700 delay-300 fill-mode-both w-full flex flex-col justify-center items-center gap-y-5">
                    <h2 className="text-4xl font-bold text-foreground text-center mt-10">Preview demo</h2>
                    <PreviewCanvas />
                </div>
            </section>

            <section id="features" className="min-h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-background py-20 px-6 md:px-20">
                <h2 className="text-4xl font-bold text-foreground text-center mt-10">Features</h2>
                <p className="text-foreground text-center">These features will be unlocked after signing in. Sign In now, and get started!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {/* 1*/}
                    <div className="p-8 rounded-3xl bg-card border border-blue-500/20 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <User size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Real-time Collaboration</h3>
                        <p className="text-foreground/70">Invite your team and work together with instant syncing.</p>
                    </div>

                    {/* 2  */}
                    <div className="p-8 rounded-3xl bg-card border border-rose-500/20 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <PencilLine size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Various Elements</h3>
                        <p className="text-foreground/70">Add a variety of objects to your board like textboxes, rectangles, drawings and more!</p>
                    </div>

                    {/* 3  */}
                    <div className="p-8 rounded-3xl bg-card border border-amber-500/20 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <MousePointer2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Live Previews and Tracking</h3>
                        <p className="text-foreground/70">Track what your teammates do by seeing their cursors on your screen and see live previews.</p>
                    </div>

                    {/* 4 */}
                    <div className="p-8 rounded-3xl bg-card border border-emerald-500/20 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Organizations</h3>
                        <p className="text-foreground/70">Create organizations to add different teams and people to them, with separate boards and contents.</p>
                    </div>

                    {/* 5 */}
                    <div className="p-8 rounded-3xl bg-card border border-violet-500/20 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-500 mb-6 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                            <Stars size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Favorites</h3>
                        <p className="text-foreground/70">Add boards to your favorites to access them with ease.</p>
                    </div>

                    {/* 6  */}
                    <div className="p-8 rounded-3xl bg-card border border-cyan-500/20 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-12 w-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Layers</h3>
                        <p className="text-foreground/70">With many layers in the board, control the z-index any layer! Sign In now, and get started!</p>
                    </div>
                </div>
            </section>

        </div>
    )
}