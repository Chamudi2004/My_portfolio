
import { motion } from "framer-motion";
import {
    GraduationCap,
    Trophy,
    Award,
    BriefcaseBusiness,
    Rocket,
    Star,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const typeStyles: Record<
    string,
    {
        color: "cyan" | "violet";
        label: string;
        icon: typeof GraduationCap;
    }
> = {
    Education: {
        color: "violet",
        label: "Academic Journey",
        icon: GraduationCap,
    },
    Experience: {
        color: "cyan",
        label: "Professional Experience",
        icon: BriefcaseBusiness,
    },
    Achievement: {
        color: "cyan",
        label: "Achievement Unlocked",
        icon: Trophy,
    },
    Certification: {
        color: "violet",
        label: "Professional Learning",
        icon: Award,
    },
};

function formatDate(date: string | null) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

export default function Journey() {
    const { portfolio, loading, error } = usePortfolio();

    // Get records from Supabase
    const education = (portfolio?.education ?? []).map((item) => ({
        id: item.id,
        type: "Education",
        title: item.qualification,
        organization: item.institution,
        description: item.description ?? "",
        date: item.is_current
            ? `${formatDate(item.start_date)} - Present`
            : [formatDate(item.start_date), formatDate(item.end_date)]
                .filter(Boolean)
                .join(" - "),
    }));

    const experience = (portfolio?.experience ?? []).map((item) => ({
        id: item.id,
        type: "Experience",
        title: item.position,
        organization: item.organization,
        description: item.description ?? "",
        date: item.is_current
            ? `${formatDate(item.start_date)} - Present`
            : [formatDate(item.start_date), formatDate(item.end_date)]
                .filter(Boolean)
                .join(" - "),
    }));


    const milestones = [
        ...education,
        ...experience,
    ];

    return (
        <section
            id="journey"
            className="relative z-10 px-6 py-28"
        >
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-20 text-center"
                >
                    <div className="mb-5 flex items-center justify-center gap-2">
                        <Star size={17} className="text-cyan-300" />
                        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                            Journey Through Time
                        </p>
                        <Star size={17} className="text-cyan-300" />
                    </div>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        My <span className="text-violet-400">Journey</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
                        Every milestone represents a new discovery, an opportunity
                        to learn, and another step forward in my technology journey.
                    </p>
                </motion.div>

                {/* Loading and error messages */}
                {loading && (
                    <p className="py-10 text-center text-slate-400">
                        Loading my journey...
                    </p>
                )}

                {!loading && error && (
                    <p className="py-10 text-center text-red-400">
                        Unable to load journey information.
                    </p>
                )}

                {/* Timeline */}
                {!loading && !error && (
                    <>
                        {milestones.length > 0 ? (
                            <div className="relative">

                                {/* Timeline line */}
                                <div className="absolute bottom-8 left-6 top-8 w-px bg-gradient-to-b from-violet-400 via-cyan-400 to-transparent md:left-1/2 md:-translate-x-1/2" />

                                <div className="space-y-12">
                                    {milestones.map((item, index) => {
                                        const style = typeStyles[item.type];
                                        const Icon = style.icon;
                                        const isLeft = index % 2 === 0;

                                        return (
                                            <motion.div
                                                key={`${item.type}-${item.id}`}
                                                initial={{
                                                    opacity: 0,
                                                    x: isLeft ? -30 : 30,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                viewport={{
                                                    once: true,
                                                    amount: 0.2,
                                                }}
                                                transition={{
                                                    duration: 0.65,
                                                    delay: 0.1,
                                                }}
                                                className={`relative flex items-start pl-16 md:w-1/2 md:pl-0 ${isLeft
                                                    ? "md:mr-auto md:pr-14"
                                                    : "md:ml-auto md:pl-14"
                                                    }`}
                                            >
                                                {/* Timeline marker */}
                                                <div className="absolute left-0 top-7 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/40 bg-[#10172e] text-violet-300 shadow-[0_0_25px_rgba(139,92,246,0.2)] md:left-auto md:right-[-24px]">
                                                    <Icon size={21} />
                                                </div>

                                                {/* Milestone card */}
                                                <div className="w-full rounded-2xl border border-white/10 bg-[#10172e]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_10px_35px_rgba(139,92,246,0.1)] sm:p-7">

                                                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                                        <span
                                                            className={`rounded-full border px-3 py-1 text-xs ${style.color === "cyan"
                                                                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                                                                : "border-violet-400/20 bg-violet-400/10 text-violet-300"
                                                                }`}
                                                        >
                                                            {item.type}
                                                        </span>

                                                        <Rocket
                                                            size={17}
                                                            className="text-slate-500"
                                                        />
                                                    </div>

                                                    <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">
                                                        {style.label}
                                                    </p>

                                                    <h3 className="text-xl font-semibold leading-snug text-white">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-2 text-sm font-medium text-cyan-200">
                                                        {item.organization}
                                                    </p>

                                                    {item.date && (
                                                        <p className="mt-2 text-xs text-violet-300">
                                                            {item.date}
                                                        </p>
                                                    )}

                                                    {item.description && (
                                                        <p className="mt-4 text-sm leading-7 text-slate-400">
                                                            {item.description}
                                                        </p>
                                                    )}

                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className="py-10 text-center text-slate-400">
                                Journey milestones will appear here.
                            </p>
                        )}
                    </>
                )}

                <p className="mt-16 text-center text-sm text-slate-500">
                    The journey continues. More milestones ahead.
                </p>

            </div>
        </section>
    );
}
