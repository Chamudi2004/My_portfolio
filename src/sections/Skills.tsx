
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Code2,
    Smartphone,
    Database,
    Wrench,
    Sparkles,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const categories = [
    "All",
    "Languages",
    "Frontend & Mobile",
    "Backend & Databases",
    "Tools & Technologies",
];

const categoryIcons = [
    Code2,
    Code2,
    Smartphone,
    Database,
    Wrench,
];

// Technology name to Simple Icons slug
const skillLogoMap: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    java: "java",
    dart: "dart",
    react: "react",
    "react native": "react",
    flutter: "flutter",
    html: "html5",
    html5: "html5",
    css: "css",
    css3: "css",
    "tailwind css": "tailwindcss",
    fastapi: "fastapi",
    firebase: "firebase",
    mongodb: "mongodb",
    sqlite: "sqlite",
    git: "git",
    github: "github",
    figma: "figma",
};

// Match database categories to the displayed filter categories
function getDisplayCategory(category: string) {
    const normalized = category.toLowerCase().trim();

    if (
        normalized.includes("language") ||
        normalized.includes("programming")
    ) {
        return "Languages";
    }

    if (
        normalized.includes("frontend") ||
        normalized.includes("front-end") ||
        normalized.includes("mobile")
    ) {
        return "Frontend & Mobile";
    }

    if (
        normalized.includes("backend") ||
        normalized.includes("back-end") ||
        normalized.includes("database")
    ) {
        return "Backend & Databases";
    }

    if (
        normalized.includes("tool") ||
        normalized.includes("technology")
    ) {
        return "Tools & Technologies";
    }

    return category;
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState("All");

    const { portfolio, loading, error } = usePortfolio();

    const skills = (portfolio?.skills ?? []).map((skill) => ({
        ...skill,
        category: getDisplayCategory(skill.category),
        logo:
            skill.name.toLowerCase().trim() === "java"
                ? "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
                : skill.icon?.trim() ||
                skillLogoMap[skill.name.toLowerCase().trim()] ||
                null,
    }));

    const filteredSkills =
        activeCategory === "All"
            ? skills
            : skills.filter(
                (skill) => skill.category === activeCategory
            );

    return (
        <section
            id="skills"
            className="relative z-10 px-6 py-28"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 text-center"
                >
                    <div className="mb-5 flex items-center justify-center gap-2">
                        <Sparkles size={17} className="text-cyan-300" />
                        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                            My Technology Universe
                        </p>
                        <Sparkles size={17} className="text-cyan-300" />
                    </div>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        Technology{" "}
                        <span className="text-violet-400">
                            Constellation
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
                        Every technology is another star in my learning journey.
                        Explore the tools and technologies I use to bring ideas to life.
                    </p>
                </motion.div>

                {/* Loading and error messages */}
                {loading && (
                    <p className="py-10 text-center text-slate-400">
                        Loading my technology universe...
                    </p>
                )}

                {!loading && error && (
                    <p className="py-10 text-center text-red-400">
                        Unable to load skills. Please try again later.
                    </p>
                )}

                {!loading && !error && (
                    <>
                        {/* Category filters */}
                        <div className="mb-12 flex flex-wrap justify-center gap-3">
                            {categories.map((category, index) => {
                                const Icon = categoryIcons[index];

                                return (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition duration-300 ${activeCategory === category
                                            ? "border-violet-400 bg-violet-600 text-white shadow-[0_0_25px_rgba(139,92,246,0.25)]"
                                            : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-violet-400/50 hover:text-white"
                                            }`}
                                    >
                                        <Icon size={15} />
                                        {category}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Skills cards */}
                        <motion.div
                            layout
                            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredSkills.map((skill, index) => (
                                    <motion.div
                                        layout
                                        key={skill.id}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.85,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.85,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            delay: index * 0.025,
                                        }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#10172e]/80 p-5 transition duration-300 hover:-translate-y-2 hover:border-violet-400/50 hover:shadow-[0_10px_35px_rgba(139,92,246,0.12)] sm:p-6"
                                    >
                                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-400/25" />

                                        <div className="relative flex items-center gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 p-3 transition group-hover:border-violet-300/50 group-hover:bg-violet-500/20">
                                                {skill.logo ? (
                                                    <img
                                                        src={
                                                            skill.logo?.startsWith("https://")
                                                                ? skill.logo
                                                                : `https://cdn.simpleicons.org/${skill.logo}`
                                                        }
                                                        alt={`${skill.name} logo`}
                                                        className="h-full w-full object-contain"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <Code2
                                                        size={28}
                                                        className="text-violet-300"
                                                    />
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="truncate font-semibold text-white">
                                                    {skill.name}
                                                </h3>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {skill.category}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative mt-5 flex items-center gap-2 text-xs text-slate-500">
                                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
                                            Part of my tech universe
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredSkills.length === 0 && (
                            <p className="py-10 text-center text-slate-400">
                                No skills found in this category.
                            </p>
                        )}
                    </>
                )}

                {/* Bottom note */}
                <p className="mt-12 text-center text-sm text-slate-500">
                    Always learning. Always exploring. Always building.
                </p>

            </div>
        </section>
    );
}
