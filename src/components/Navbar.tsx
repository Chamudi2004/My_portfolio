
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Menu, X, Code2, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Achievements", href: "#achievements" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track the currently visible section
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      navLinks.forEach((link) => {
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
          const position = section.getBoundingClientRect().top;

          if (position <= 150) {
            current = sectionId;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle navigation and scrolling
  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMobileMenu = false
  ) => {
    event.preventDefault();

    const sectionId = href.substring(1);

    setActiveSection(sectionId);

    if (closeMobileMenu) {
      setIsOpen(false);
    }

    const scrollToSection = () => {
      const section = document.getElementById(sectionId);

      if (!section) {
        console.error(`Section not found: ${sectionId}`);
        return;
      }

      const navbarHeight = 90;

      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, sectionPosition - navbarHeight),
        behavior: "smooth",
      });

      window.history.replaceState(null, "", href);
    };

    // Allow the mobile menu closing animation to finish
    if (closeMobileMenu) {
      window.setTimeout(scrollToSection, 300);
    } else {
      scrollToSection();
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050816]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Brand */}
        <a
          href="#home"
          onClick={(event) =>
            handleLinkClick(event, "#home", true)
          }
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-400/10 text-violet-300">
            <Code2 size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-wide text-white">
              Chamudi<span className="text-violet-400">.</span>
            </h2>

            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Developer Portfolio
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) =>
                handleLinkClick(event, link.href)
              }
              className={`relative py-2 text-xs font-medium transition duration-300 ${activeSection === link.href.substring(1)
                  ? "text-violet-300"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              {link.name}

              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-violet-400"
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <a
          href="#contact"
          onClick={(event) =>
            handleLinkClick(event, "#contact")
          }
          className="hidden items-center gap-2 rounded-full border border-violet-400/40 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-400/20 lg:flex"
        >
          Let's Talk
          <ArrowUpRight size={15} />
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition hover:border-violet-400/50 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-y-auto border-t border-white/10 bg-[#080d20] lg:hidden"
            style={{ maxHeight: "calc(100dvh - 72px)" }}
          >
            <div className="flex flex-col px-6 py-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(event) =>
                    handleLinkClick(event, link.href, true)
                  }
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={`border-b border-white/5 py-3 text-sm transition ${activeSection === link.href.substring(1)
                      ? "font-semibold text-violet-300"
                      : "text-slate-400 hover:text-white"
                    }`}
                >
                  {link.name}
                </motion.a>
              ))}

              <a
                href="#contact"
                onClick={(event) =>
                  handleLinkClick(event, "#contact", true)
                }
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-violet-500/20 px-4 py-3 text-sm font-medium text-violet-300 transition hover:bg-violet-500/30"
              >
                Let's Talk
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
