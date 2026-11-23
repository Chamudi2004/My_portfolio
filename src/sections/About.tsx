
import { motion } from "framer-motion";
import { Code2, GraduationCap, Lightbulb, Rocket } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

const interests = [
    {
        icon: Code2,
        title: "Application Development",
        description:
            "Building useful mobile and web applications with modern technologies.",
    },
    {
        icon: Lightbulb,
        title: "Creative Problem Solving",
        description:
            "Turning ideas and real-world problems into practical digital solutions.",
    },
    {
        icon: Rocket,
        title: "Emerging Technologies",
        description:
            "Exploring new technologies and continuously expanding my knowledge.",
    },
];

export default function About() {
    const { portfolio } = usePortfolio();

    const profile = portfolio?.profile;
    const education = portfolio?.education?.[0];

    const name = profile?.full_name ?? "Chamudi Disanayaka";


    const introduction =
        profile?.introduction ??
        "I'm passionate about application development, exploring emerging technologies, and creating meaningful digital experiences.";

    const profileImage =
        profile?.profile_image_url || "/images/chamudi.png";

    const qualification =
        education?.qualification ?? "Computing and Information Systems Undergraduate";

    const institution =
        education?.institution ?? "Sabaragamuwa University of Sri Lanka";

    return (
        <section
            id="about"
            className="relative z-10 px-6 py-28"
        >
            <div className="mx-auto max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 text-center"
                >
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-300">
                        Mission Briefing
                    </p>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        About <span className="text-violet-400">Me</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-slate-400">
                        A little introduction to the person behind this universe.
                    </p>
                </motion.div>

                <div className="grid items-center gap-12 lg:grid-cols-2">

                    <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <div className="relative w-full max-w-sm">

                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-600/30 to-cyan-400/20 blur-2xl" />

                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#10172e] p-3">
                                <img
                                    src={profileImage}
                                    alt={name}
                                    className="aspect-[4/5] w-full rounded-2xl object-cover"
                                />

                                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#080d20]/85 p-4 backdrop-blur-lg">
                                    <p className="text-lg font-semibold text-white">
                                        {name}
                                    </p>
                                    <p className="mt-1 text-sm text-violet-300">
                                        Technology Explorer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div>
                            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-cyan-300">
                                Who am I?
                            </p>

                            <h3 className="text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                                A curious mind with a passion for technology and innovation.
                            </h3>
                        </div>

                        <p className="leading-8 text-slate-400">
                            {introduction}
                        </p>

                        <p className="leading-8 text-slate-400">
                            I enjoy learning new tools, experimenting with ideas, and
                            working on projects that help solve practical problems.
                            My journey in technology is driven by curiosity,
                            creativity, and continuous learning.
                        </p>

                        <div className="flex items-center gap-3 rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4">
                            <GraduationCap
                                className="shrink-0 text-violet-300"
                                size={28}
                            />
                            <div>
                                <p className="font-medium text-white">
                                    Academic Journey
                                </p>
                                <p className="mt-1 text-sm text-slate-400">
                                    {qualification}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    {institution}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-20 grid gap-5 md:grid-cols-3">
                    {interests.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:bg-violet-500/[0.06]"
                            >
                                <Icon
                                    className="mb-5 text-violet-300"
                                    size={30}
                                />

                                <h4 className="mb-3 text-lg font-semibold text-white">
                                    {item.title}
                                </h4>

                                <p className="text-sm leading-7 text-slate-400">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
