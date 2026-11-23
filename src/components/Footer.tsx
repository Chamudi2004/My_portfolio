
import { ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#080d20]/80 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

        <a href="#home" className="text-lg font-bold tracking-wider text-white">
          CHAMUDI<span className="text-violet-400">.</span>
        </a>

        <p className="flex items-center gap-1 text-sm text-slate-500">
          Made with <Heart size={14} className="fill-violet-400 text-violet-400" />
          and curiosity by Chamudi Disanayaka
        </p>

        <a
          href="#home"
          className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
        >
          Back to top
          <ArrowUp size={16} />
        </a>

      </div>

      <p className="mt-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Chamudi Disanayaka. All rights reserved.
      </p>
    </footer>
  );
}
