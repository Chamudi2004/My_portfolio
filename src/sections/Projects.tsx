
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowUpRight,
    Code2,
    ExternalLink,
    Globe2,
    BrainCircuit,
    HeartPulse,
    Smartphone,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const filters = ["All", "Mobile", "AI", "IoT", "Web"];

// Visual details that are not stored in the database
const projectPresentation: Record<
    string,
    {
        subtitle: string;
        initials: string;
        gradient: string;
        icon: typeof Globe2;
    }
> = {
    agelink: {
        subtitle: "IoT Smart Health Assistant",
        initials: "AL",
        gradient: "from-cyan-500/30 to-blue-700/40",
        icon: HeartPulse,
    },
    ontime: {
        subtitle: "Smart Attendance & HR",
        initials: "OT",
        gradient: "from-violet-500/30 to-indigo-700/40",
        icon: Smartphone,
    },
    trustbubble: {
        subtitle: "AI Content Verification",
        initials: "TB",
        gradient: "from-fuchsia-500/30 to-purple-700/40",
        icon: BrainCircuit,
    },
    "chathuranga-stickers-web": {
        subtitle: "Responsive Sticker Website",
        initials: "CS",
        gradient: "from-amber-500/30 to-orange-700/40",
        icon: Globe2,
    },
};

const defaultPresentation = {
    subtitle: "Software Development Project",
    initials: "PR",
    gradient: "from-violet-500/30 to-indigo-700/40",
    icon: Globe2,
};

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("All");

    const { portfolio, loading, error } = usePortfolio();

    // Get project records from Supabase
    const projects = (portfolio?.projects ?? []).map((project) => {
        const presentation =
            projectPresentation[project.slug] ?? defaultPresentation;

        return {
            ...project,
            name: project.title,
            subtitle: presentation.subtitle,
            initials: presentation.initials,
            gradient: presentation.gradient,
            icon: presentation.icon,
            technologies: project.technologies ?? [],
            github: project.github_url,
            demo: project.demo_url,
            image_url: project.image_url,
        };
    });

    // Apply category filters
    const visibleProjects =
        activeFilter === "All"
            ? projects
            : projects.filter(
                (project) =>
                    project.category?.toLowerCase() ===
                    activeFilter.toLowerCase()
            );

    return (
        <section
            id="projects"
            className="relative z-10 px-6 py-28"
        >
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 text-center"
                >
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
                        Missions Accomplished
                    </p>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        Projects{" "}
                        <span className="text-violet-400">Galaxy</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
                        A collection of ideas, experiments, and digital
                        solutions I've explored throughout my development journey.
                        Select a planet to explore its mission.
                    </p>
                </motion.div>

                {/* Loading and error messages */}
                {loading && (
                    <p className="py-10 text-center text-slate-400">
                        Loading my projects...
                    </p>
                )}

                {!loading && error && (
                    <p className="py-10 text-center text-red-400">
                        Unable to load projects. Please try again later.
                    </p>
                )}

                {!loading && !error && (
                    <>
                        {/* Filters */}
                        <div className="mb-12 flex flex-wrap justify-center gap-3">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`rounded-full border px-6 py-2.5 text-sm transition duration-300 ${activeFilter === filter
                                            ? "border-violet-400 bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                                            : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-violet-400/50 hover:text-white"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Project cards */}
                        <motion.div
                            layout
                            className="grid gap-7 sm:grid-cols-2"
                        >
                            <AnimatePresence mode="popLayout">
                                {visibleProjects.map((project, index) => {
                                    const Icon = project.icon;

                                    return (
                                        <motion.article
                                            layout
                                            key={project.id}
                                            initial={{
                                                opacity: 0,
                                                y: 30,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.9,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.08,
                                            }}
                                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#10172e]/80 p-6 transition duration-300 hover:-translate-y-2 hover:border-violet-400/50 hover:shadow-[0_15px_50px_rgba(139,92,246,0.12)] sm:p-8"
                                        >
                                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-violet-500/20" />

                                            <div className="relative">

                                                {/* Project screenshot */}
                                                <div className="relative mb-7 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#172344] to-[#241b45]">
                                                    {/* Fallback initials */}
                                                    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                                                        <span className="text-5xl font-bold text-white/80">
                                                            {project.initials}
                                                        </span>
                                                    </div>

                                                    {/* Actual project image */}
                                                    {project.image_url && (
                                                        <img
                                                            src={project.image_url}
                                                            alt={`${project.name} project preview`}
                                                            loading="lazy"
                                                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                            onError={(event) => {
                                                                event.currentTarget.style.display = "none";
                                                            }}
                                                        />
                                                    )}

                                                    {/* Project category icon */}
                                                    <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#10172e]/80 text-violet-300 backdrop-blur-sm">
                                                        <Icon size={20} />
                                                    </div>
                                                </div>

                                                {/* Project information */}
                                                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
                                                    {project.category} Mission
                                                </p>

                                                <h3 className="text-2xl font-bold text-white">
                                                    {project.name}
                                                </h3>

                                                <p className="mt-2 font-medium text-cyan-200">
                                                    {project.subtitle}
                                                </p>

                                                <p className="mt-4 min-h-20 text-sm leading-7 text-slate-400">
                                                    {project.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="mt-6">
                                                    <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">
                                                        Technology used
                                                    </p>

                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map(
                                                            (technology: string) => (
                                                                <span
                                                                    key={technology}
                                                                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
                                                                >
                                                                    {technology}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Optional project links */}
                                                {(project.github || project.demo) && (
                                                    <div className="mt-7 flex flex-wrap gap-4 border-t border-white/10 pt-5">
                                                        {project.github && (
                                                            <a
                                                                href={project.github}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-violet-300"
                                                            >
                                                                <Code2 size={17} />
                                                                GitHub
                                                                <ArrowUpRight size={14} />
                                                            </a>
                                                        )}

                                                        {project.demo && (
                                                            <a
                                                                href={project.demo}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-300"
                                                            >
                                                                <ExternalLink size={17} />
                                                                Live Demo
                                                                <ArrowUpRight size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                )}

                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {visibleProjects.length === 0 && (
                            <p className="py-10 text-center text-slate-400">
                                No projects found in this category.
                            </p>
                        )}
                    </>
                )}

                <p className="mt-12 text-center text-sm text-slate-500">
                    Every project is another step in my journey through technology.
                </p>

            </div>
        </section>
    );
}
