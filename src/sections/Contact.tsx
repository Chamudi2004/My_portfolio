
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import {
    Mail,
    Send,
    MapPin,
    ArrowUpRight,
    MessageCircle,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const contactEmail = "chamudidisanayaka2004@gmail.com";
const linkedInUrl = "https://www.linkedin.com/in/chamudi-disanayaka/";

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
    const [status, setStatus] = useState<SubmissionStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaWidgetKey, setCaptchaWidgetKey] = useState(0);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || !message) {
            setStatus("error");
            setErrorMessage("Please complete all required fields.");
            return;
        }

        if (!captchaToken) {
            setStatus("error");
            setErrorMessage("Please complete the security verification.");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const { data, error } = await supabase.functions.invoke(
                "submit-contact-message",
                {
                    body: {
                        name,
                        email,
                        subject,
                        message,
                        captchaToken,
                    },
                }
            );

            if (error) {
                throw error;
            }

            if (!data?.success) {
                throw new Error(data?.error || "Message submission failed.");
            }

            form.reset();
            setStatus("success");
        } catch (error) {
            console.error("Contact form submission failed:", error);

            setStatus("error");
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Your message could not be submitted. Please try again later."
            );
        } finally {
            // Turnstile tokens are single-use. Request a fresh token
            // for the next submission, whether this attempt succeeded or failed.
            setCaptchaToken(null);
            setCaptchaWidgetKey((current) => current + 1);
        }
    }

    return (
        <section
            id="contact"
            className="relative z-10 overflow-hidden px-6 py-28"
        >
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 text-center"
                >
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
                        Establish Connection
                    </p>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        Mission{" "}
                        <span className="text-violet-400">Control</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
                        Have an idea, an opportunity, or just want to say hello?
                        My communication channel is open. Let's connect!
                    </p>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2">

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-8"
                    >
                        <div>
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                                    <MessageCircle className="text-violet-300" size={23} />
                                </div>

                                <h3 className="text-2xl font-semibold text-white">
                                    Let's Talk
                                </h3>
                            </div>

                            <p className="max-w-md leading-8 text-slate-400">
                                I'm always interested in connecting with people,
                                discussing innovative ideas, exploring opportunities,
                                and collaborating on meaningful projects.
                            </p>
                        </div>

                        {/* Email */}
                        <a
                            href={`mailto:${contactEmail}`}
                            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/40 hover:bg-violet-500/[0.05]"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                                <Mail size={22} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                    Email
                                </p>

                                <p className="mt-1 break-all font-medium text-white">
                                    {contactEmail}
                                </p>
                            </div>

                            <ArrowUpRight
                                size={18}
                                className="text-slate-500 transition group-hover:text-violet-300"
                            />
                        </a>

                        {/* Location */}
                        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                                <MapPin size={22} />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                    Location
                                </p>

                                <p className="mt-1 font-medium text-white">
                                    Sri Lanka
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className="mb-4 text-sm font-medium text-slate-400">
                                Find me across the universe
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://github.com/Chamudi2004"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub profile"
                                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-violet-400/50 hover:text-violet-300"
                                >
                                    <FaGithub size={21} />
                                </a>

                                <a
                                    href={linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn profile"
                                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-violet-400/50 hover:text-violet-300"
                                >
                                    <FaLinkedin size={21} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-3xl border border-violet-400/20 bg-[#10172e]/80 p-7 shadow-[0_0_50px_rgba(139,92,246,0.08)] sm:p-9"
                    >
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

                        <div className="relative">
                            <h3 className="text-2xl font-semibold text-white">
                                Send a Message
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Let's start a conversation.
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-5"
                            >
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="mb-2 block text-sm text-slate-300"
                                    >
                                        Your Name
                                    </label>

                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        maxLength={100}
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="mb-2 block text-sm text-slate-300"
                                    >
                                        Your Email
                                    </label>

                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        maxLength={254}
                                        placeholder="Enter your email"
                                        className="w-full rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="contact-subject"
                                        className="mb-2 block text-sm text-slate-300"
                                    >
                                        Subject
                                    </label>

                                    <input
                                        id="contact-subject"
                                        name="subject"
                                        type="text"
                                        maxLength={150}
                                        placeholder="What would you like to discuss?"
                                        className="w-full rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        className="mb-2 block text-sm text-slate-300"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        maxLength={5000}
                                        rows={4}
                                        placeholder="Write your message here..."
                                        className="w-full resize-none rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400"
                                    />
                                </div>

                                {/* Cloudflare Turnstile */}
                                <div className="overflow-hidden">
                                    {turnstileSiteKey ? (
                                        <Turnstile
                                            key={captchaWidgetKey}
                                            siteKey={turnstileSiteKey}
                                            onSuccess={(token) => {
                                                setCaptchaToken(token);
                                                setErrorMessage("");
                                                if (status === "error") {
                                                    setStatus("idle");
                                                }
                                            }}
                                            onExpire={() => setCaptchaToken(null)}
                                            onError={() => {
                                                setCaptchaToken(null);
                                                setStatus("error");
                                                setErrorMessage(
                                                    "Security verification failed. Please refresh the verification and try again."
                                                );
                                            }}
                                            options={{
                                                theme: "dark",
                                                size: "flexible",
                                            }}
                                        />
                                    ) : (
                                        <p className="text-sm text-red-300">
                                            Security verification is not configured.
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={
                                        status === "loading" ||
                                        !captchaToken ||
                                        !turnstileSiteKey
                                    }
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-medium text-white transition hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {status === "loading" ? (
                                        <>
                                            Sending...
                                            <LoaderCircle size={18} className="animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>

                                {/* Success Message */}
                                {status === "success" && (
                                    <div
                                        role="status"
                                        className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-300"
                                    >
                                        <CheckCircle2 size={20} className="shrink-0" />
                                        Your message has been submitted successfully. Thank you!
                                    </div>
                                )}

                                {/* Error Message */}
                                {status === "error" && (
                                    <div
                                        role="alert"
                                        className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
                                    >
                                        <AlertCircle size={20} className="shrink-0" />
                                        {errorMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
