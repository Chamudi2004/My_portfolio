
import { motion } from "framer-motion";
import { Trophy, Medal, Star, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Achievements() {
    const { portfolio, loading, error } = usePortfolio();

    const achievements = portfolio?.achievements ?? [];

    function formatDate(date: string | null) {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    }

    return (
        <section
            id="achievements"
            className="relative z-10 px-6 py-28"
        >
            <div className="mx-auto max-w-6xl">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 text-center"
                >
                    <div className="mb-5 flex items-center justify-center gap-2">
                        <Star size={17} className="text-cyan-300" />
                        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                            Milestones & Recognition
                        </p>
                        <Star size={17} className="text-cyan-300" />
                    </div>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        My <span className="text-violet-400">Achievements</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
                        Every achievement represents dedication, teamwork,
                        learning, and the courage to take on new challenges.
                    </p>
                </motion.div>

                {/* Loading */}
                {loading && (
                    <p className="py-10 text-center text-slate-400">
                        Loading achievements...
                    </p>
                )}

                {/* Error */}
                {!loading && error && (
                    <p className="py-10 text-center text-red-400">
                        Unable to load achievements.
                    </p>
                )}

                {/* Achievement Cards */}
                {!loading && !error && (
                    <>
                        {achievements.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {achievements.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.08,
                                        }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#10172e]/80 p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-[0_10px_35px_rgba(139,92,246,0.12)]"
                                    >
                                        {/* Decorative background */}
                                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-cyan-400/10" />

                                        {/* Icon */}
                                        <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                                            <Trophy size={27} />
                                        </div>

                                        {/* Category */}
                                        <div className="mb-4 flex items-center gap-2">
                                            <Medal
                                                size={15}
                                                className="text-cyan-300"
                                            />
                                            <span className="text-xs uppercase tracking-widest text-cyan-300">
                                                Recognition
                                            </span>
                                        </div>

                                        {/* Achievement title */}
                                        <h3 className="text-xl font-semibold leading-snug text-white transition group-hover:text-violet-300">
                                            {item.title}
                                        </h3>

                                        {/* Organization */}
                                        <p className="mt-3 text-sm font-medium text-cyan-200">
                                            {item.organization}
                                        </p>

                                        {/* Description */}
                                        {item.description && (
                                            <p className="mt-4 text-sm leading-7 text-slate-400">
                                                {item.description}
                                            </p>
                                        )}

                                        {/* Date */}
                                        {item.achievement_date && (
                                            <div className="mt-6 border-t border-white/10 pt-4">
                                                <span className="text-xs text-slate-500">
                                                    {formatDate(item.achievement_date)}
                                                </span>
                                            </div>
                                        )}

                                        <ArrowUpRight
                                            size={18}
                                            className="absolute bottom-7 right-7 text-slate-600 transition group-hover:text-violet-300"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="py-10 text-center text-slate-400">
                                No achievements available yet.
                            </p>
                        )}
                    </>
                )}

                {/* Footer Text */}
                <p className="mt-16 text-center text-sm text-slate-500">
                    Every milestone is another reason to keep moving forward.
                </p>

            </div>
        </section>
    );
}
