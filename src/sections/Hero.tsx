
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Hero() {
    const { portfolio: portfolioData } = usePortfolio();

    // Get profile information from Supabase
    const profile = portfolioData?.profile;

    // Fallback values are used while data is loading
    const name = profile?.full_name ?? "Chamudi Disanayaka";
    const role =
        profile?.role ??
        "Computing & Information Systems Undergraduate";
    const introduction =
        profile?.introduction ??
        "I enjoy exploring technology and building meaningful digital experiences.";
    const tagline =
        profile?.tagline ??
        "Exploring technology. Building meaningful digital experiences.";

    const cvUrl =
        profile?.cv_url || "/documents/Chamudi_CV.pdf";

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28"
        >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="relative z-10"
                >
                    <p className="mb-6 flex items-center gap-3 text-sm tracking-[0.25em] text-violet-300 uppercase">
                        <span className="h-px w-10 bg-violet-400" />
                        Welcome to my universe
                    </p>

                    <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                        Hi, I'm
                        <span className="mt-2 block bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                            {name}
                        </span>
                    </h1>

                    <h2 className="mt-6 text-lg font-medium text-slate-300 sm:text-xl">
                        {role}
                    </h2>

                    <p className="mt-5 max-w-xl leading-8 text-slate-400">
                        {introduction}
                    </p>

                    <p className="mt-4 text-sm text-violet-300">
                        {tagline}
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <a
                            href="#projects"
                            className="flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-medium text-white transition hover:bg-violet-500"
                        >
                            Explore My Work
                            <ArrowUpRight size={18} />
                        </a>

                        <a
                            href={cvUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-white/20 px-7 py-3 text-white transition hover:border-violet-400 hover:text-violet-300"
                        >
                            View My CV
                        </a>
                    </div>

                    <a
                        href="#about"
                        className="mt-16 inline-flex items-center gap-3 text-sm text-slate-400 transition hover:text-white"
                    >
                        Discover more
                        <ArrowDown size={16} />
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
                >
                    <div className="absolute inset-5 rounded-full border border-violet-400/20 animate-[spin_35s_linear_infinite]" />

                    <div className="absolute inset-12 rounded-full border border-cyan-300/20 animate-[spin_25s_linear_infinite_reverse]" />

                    <div className="absolute h-64 w-64 rounded-full bg-violet-600/20 blur-[90px]" />

                    <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-violet-300/30 bg-gradient-to-br from-violet-500/30 via-[#111a3b] to-cyan-500/20 shadow-[0_0_80px_rgba(139,92,246,0.25)] sm:h-64 sm:w-64">
                        <div className="text-center">
                            <span className="block text-7xl font-bold text-white sm:text-8xl">
                                CD
                            </span>
                            <span className="mt-3 block text-xs tracking-[0.35em] text-violet-200">
                                MY UNIVERSE
                            </span>
                        </div>
                    </div>

                    <div className="absolute right-5 top-12 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_25px_#67e8f9]" />

                    <div className="absolute bottom-12 left-5 h-3 w-3 rounded-full bg-violet-300 shadow-[0_0_25px_#c4b5fd]" />
                </motion.div>

            </div>
        </section>
    );
}
