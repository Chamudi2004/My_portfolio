
import { motion } from "framer-motion";
import {
    Award,
    BookOpen,
    ExternalLink,
    BadgeCheck,
    GraduationCap,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Certifications() {
    const { portfolio, loading, error } = usePortfolio();

    const certifications = portfolio?.certifications ?? [];


    function formatDate(date: string | null) {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    }

    return (
        <section
            id="certifications"
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
                        <GraduationCap
                            size={18}
                            className="text-cyan-300"
                        />
                        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                            Learning & Development
                        </p>
                        <GraduationCap
                            size={18}
                            className="text-cyan-300"
                        />
                    </div>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        My <span className="text-violet-400">Certifications</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
                        Continuous learning is an important part of my journey.
                        Here are some courses and certifications I have completed
                        to strengthen my technical knowledge and skills.
                    </p>
                </motion.div>

                {/* Loading */}
                {loading && (
                    <p className="py-10 text-center text-slate-400">
                        Loading certifications...
                    </p>
                )}

                {/* Error */}
                {!loading && error && (
                    <p className="py-10 text-center text-red-400">
                        Unable to load certifications.
                    </p>
                )}

                {/* Certification Cards */}
                {!loading && !error && (
                    <>
                        {certifications.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {certifications.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.08,
                                        }}
                                        className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#10172e]/80 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_10px_35px_rgba(34,211,238,0.1)]"
                                    >
                                        {/* Certificate Image */}
                                        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b border-white/10 bg-[#0b1124] p-3">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={`${item.title} certificate`}
                                                    loading="lazy"
                                                    className="h-full w-full rounded-lg object-contain transition duration-500 group-hover:scale-[1.03]"
                                                    onError={(event) => {
                                                        event.currentTarget.style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-3 text-cyan-300">
                                                    <Award size={45} />
                                                    <span className="text-xs text-slate-500">
                                                        Certificate preview unavailable
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        <div className="flex flex-1 flex-col p-7">

                                            {/* Certificate Icon */}
                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                                                <Award size={28} />
                                            </div>

                                            {/* Category */}
                                            <div className="mb-4 flex items-center gap-2">
                                                <BadgeCheck
                                                    size={15}
                                                    className="text-violet-300"
                                                />
                                                <span className="text-xs uppercase tracking-widest text-violet-300">
                                                    Completed
                                                </span>
                                            </div>

                                            {/* Certificate Title */}
                                            <h3 className="text-xl font-semibold leading-snug text-white transition group-hover:text-cyan-200">
                                                {item.title}
                                            </h3>

                                            {/* Issuer */}
                                            <p className="mt-3 text-sm font-medium text-cyan-200">
                                                {item.issuer}
                                            </p>

                                            {/* Description */}
                                            {item.description && (
                                                <p className="mt-4 text-sm leading-7 text-slate-400">
                                                    {item.description}
                                                </p>
                                            )}

                                            {/* Date and Certificate Link */}
                                            <div className="mt-auto pt-6">
                                                {item.issue_date && (
                                                    <div className="mb-5 flex items-center gap-2 border-t border-white/10 pt-4">
                                                        <BookOpen
                                                            size={14}
                                                            className="text-slate-500"
                                                        />
                                                        <span className="text-xs text-slate-500">
                                                            {formatDate(item.issue_date)}
                                                        </span>
                                                    </div>
                                                )}

                                                {item.credential_url && (
                                                    <a
                                                        href={item.credential_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 rounded-lg border border-violet-400/30 bg-violet-400/10 px-4 py-2.5 text-sm font-medium text-violet-300 transition hover:border-violet-300 hover:bg-violet-400/20"
                                                    >
                                                        View Certificate
                                                        <ExternalLink size={15} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="py-10 text-center text-slate-400">
                                No certifications available yet.
                            </p>
                        )}
                    </>
                )}

                {/* Footer */}
                <p className="mt-16 text-center text-sm text-slate-500">
                    Learning never stops. Always exploring, improving, and growing.
                </p>

            </div>
        </section>
    );
}
