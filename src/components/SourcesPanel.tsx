"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Source {
  id: number;
  text: string;
}

export default function SourcesPanel({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-text-muted/70 hover:text-text-muted transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Sources &amp; Citations
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ol className="mt-4 space-y-1.5 list-none">
                {sources.map((source) => (
                  <li
                    key={source.id}
                    className="text-xs text-text-muted/60 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-olive/60 font-medium shrink-0 w-4 text-right">
                      {source.id}.
                    </span>
                    <span>{source.text}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function Cite({ n }: { n: number }) {
  return (
    <sup className="text-olive/50 text-[10px] font-medium ml-0.5 cursor-default">
      [{n}]
    </sup>
  );
}
