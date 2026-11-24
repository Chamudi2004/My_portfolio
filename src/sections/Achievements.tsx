
import { motion } from "framer-motion";
import {
    Trophy,
    Medal,
    Star,
    ExternalLink,
} from "lucide-react";
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
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#10172e]/80 transition duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-[0_10px_35px_rgba(139,92,246,0.12)]"
                                    >
                                        {/* Achievement Image */}
                                        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b border-white/10 bg-[#0b1124] p-3">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={`${item.title} achievement`}
                                                    loading="lazy"
                                                    className="h-full w-full rounded-lg object-contain transition duration-500 group-hover:scale-[1.03]"
                                                    onError={(event) => {
                                                        event.currentTarget.style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-3 text-violet-300">
                                                    <Trophy size={45} />
                                                    <span className="text-xs text-slate-500">
                                                        Achievement image unavailable
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        <div className="relative flex flex-1 flex-col p-7">

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

                                            {/* Proof Link */}
                                            {item.credential_url && (
                                                <div className="mt-auto pt-6">
                                                    <a
                                                        href={item.credential_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 rounded-lg border border-violet-400/30 bg-violet-400/10 px-4 py-2.5 text-sm font-medium text-violet-300 transition hover:border-violet-300 hover:bg-violet-400/20"
                                                    >
                                                        View Proof
                                                        <ExternalLink size={15} />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
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
