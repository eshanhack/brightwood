"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { ExternalLink } from "lucide-react";

/*
 * Press / media validation section.
 * Shows real articles from reputable publications that validate
 * Brightwood's thesis: Australia's data-centre energy gap is real,
 * urgent, and well-documented.
 *
 * Logos are minimal SVG wordmarks styled to match each publication's identity.
 */

interface Article {
  publication: string;
  headline: string;
  date: string;
  url: string;
  /** Short pull-quote or stat from the article */
  pullQuote: string;
  /** Brand colour for the logo accent */
  color: string;
}

const articles: Article[] = [
  {
    publication: "The Guardian",
    headline:
      "Datacentres could push up power prices and strain water supply across Australia",
    date: "Mar 2, 2026",
    url: "https://www.theguardian.com/environment/2026/mar/02/datacentres-australia-power-prices-water-supply-emissions",
    pullQuote:
      "Data centres could increase national emissions by 14% and push electricity prices up 26% in NSW by 2035.",
    color: "#052962",
  },
  {
    publication: "Australian Financial Review",
    headline:
      "Data centre power emissions double over five years",
    date: "Mar 3, 2026",
    url: "https://www.afr.com/policy/energy-and-climate/data-centre-power-emissions-double-over-five-years-20260303-p5o6vx",
    pullQuote:
      "Emissions from major data centre operators have more than doubled since 2020–21.",
    color: "#003E7E",
  },
  {
    publication: "Corrs Chambers Westgarth",
    headline: "Australia's data centre boom needs an energy plan",
    date: "2026",
    url: "https://www.corrs.com.au/insights/australias-data-centre-boom-needs-an-energy-plan",
    pullQuote:
      "Regional co-location with dedicated generation should be fast-tracked to meet demand.",
    color: "#1A1A2E",
  },
  {
    publication: "ABC News",
    headline:
      "Inside the data centres powering AI — and their enormous appetite for electricity",
    date: "Feb 5, 2026",
    url: "https://www.abc.net.au/news/2026-02-05/inside-data-centre-computers-ai-information-storage-servers/105904128",
    pullQuote:
      "Australia's grid faces a 3–5 year connection queue while AI demand grows 25% annually.",
    color: "#E40000",
  },
  {
    publication: "Climate Council",
    headline: "Seizing the opportunity to do data centres right",
    date: "Feb 19, 2026",
    url: "https://www.climatecouncil.org.au/what-does-the-data-centre-boom-mean-for-australias-switch-to-renewables/",
    pullQuote:
      "Data centre energy capacity will grow at least four times current levels by 2035.",
    color: "#00843D",
  },
  {
    publication: "CEFC / Baringa",
    headline:
      "Getting the balance right: Data centre growth and the energy transition",
    date: "Dec 12, 2025",
    url: "https://www.baringa.com/en/insights/low-carbon-futures/australias-data-centre-growth/",
    pullQuote:
      "An additional 3.2 GW of renewables and 1.9 GW of battery storage needed by 2035.",
    color: "#005F61",
  },
  {
    publication: "PV Tech",
    headline:
      "Industry demands data centres stop freeloading on Australia's clean energy",
    date: "Feb 26, 2026",
    url: "https://www.pv-tech.org/social-backlash-inevitable-industry-demands-data-centres-stop-freeloading-on-australias-clean-energy/",
    pullQuote:
      "Demand could surge from 3 TWh to 30 TWh by 2035 — equivalent to adding an entire manufacturing sector.",
    color: "#F27C00",
  },
  {
    publication: "Goldman Sachs",
    headline:
      "Data Center Power Demand: The 6 Ps driving growth and constraints",
    date: "2025",
    url: "https://www.goldmansachs.com/pdfs/insights/goldman-sachs-research/data-center-power-demand-the-6-ps-driving-growth-and-constraints/redacted_report.pdf",
    pullQuote:
      "Global data centre power demand to rise 165% by 2030 from 2023 levels.",
    color: "#7399C6",
  },
];

/* ──────────────────────────────────────────────
 * Minimal wordmark logos as SVG text
 * These are styled typographic marks, not trademarked
 * graphic logos — purely for source attribution
 * ────────────────────────────────────────────── */

function PublicationLogo({
  publication,
  color,
}: {
  publication: string;
  color: string;
}) {
  const base = "shrink-0";

  switch (publication) {
    case "The Guardian":
      return (
        <svg viewBox="0 0 140 22" className={`${base} h-[18px] w-auto`}>
          <text
            x="0"
            y="17"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="900"
            fontSize="18"
            letterSpacing="-0.5"
            fill={color}
          >
            The Guardian
          </text>
        </svg>
      );
    case "Australian Financial Review":
      return (
        <svg viewBox="0 0 50 22" className={`${base} h-[20px] w-auto`}>
          <text
            x="0"
            y="18"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="700"
            fontSize="20"
            letterSpacing="-0.5"
            fill={color}
          >
            AFR
          </text>
        </svg>
      );
    case "Corrs Chambers Westgarth":
      return (
        <svg viewBox="0 0 56 22" className={`${base} h-[16px] w-auto`}>
          <text
            x="0"
            y="16"
            fontFamily="system-ui, sans-serif"
            fontWeight="700"
            fontSize="15"
            letterSpacing="2"
            fill={color}
          >
            CORRS
          </text>
        </svg>
      );
    case "ABC News":
      return (
        <svg viewBox="0 0 100 24" className={`${base} h-[18px] w-auto`}>
          <text
            x="0"
            y="19"
            fontFamily="system-ui, sans-serif"
            fontWeight="800"
            fontSize="19"
            fill={color}
          >
            ABC
          </text>
          <text
            x="45"
            y="19"
            fontFamily="system-ui, sans-serif"
            fontWeight="400"
            fontSize="19"
            fill="#2B2723"
          >
            News
          </text>
        </svg>
      );
    case "Climate Council":
      return (
        <svg viewBox="0 0 150 22" className={`${base} h-[16px] w-auto`}>
          <text
            x="0"
            y="16"
            fontFamily="system-ui, sans-serif"
            fontWeight="700"
            fontSize="15"
            letterSpacing="0.5"
            fill={color}
          >
            Climate Council
          </text>
        </svg>
      );
    case "CEFC / Baringa":
      return (
        <svg viewBox="0 0 130 22" className={`${base} h-[16px] w-auto`}>
          <text
            x="0"
            y="16"
            fontFamily="system-ui, sans-serif"
            fontWeight="700"
            fontSize="14"
            letterSpacing="1.5"
            fill={color}
          >
            CEFC
          </text>
          <text
            x="48"
            y="16"
            fontFamily="system-ui, sans-serif"
            fontWeight="400"
            fontSize="14"
            fill="#6B6560"
          >
            / Baringa
          </text>
        </svg>
      );
    case "PV Tech":
      return (
        <svg viewBox="0 0 82 22" className={`${base} h-[18px] w-auto`}>
          <text
            x="0"
            y="18"
            fontFamily="system-ui, sans-serif"
            fontWeight="800"
            fontSize="18"
            fill={color}
          >
            PV
          </text>
          <text
            x="32"
            y="18"
            fontFamily="system-ui, sans-serif"
            fontWeight="400"
            fontSize="18"
            fill="#2B2723"
          >
            Tech
          </text>
        </svg>
      );
    case "Goldman Sachs":
      return (
        <svg viewBox="0 0 150 22" className={`${base} h-[16px] w-auto`}>
          <text
            x="0"
            y="17"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="400"
            fontSize="16"
            letterSpacing="0.5"
            fill={color}
          >
            Goldman Sachs
          </text>
        </svg>
      );
    default:
      return (
        <span className="text-sm font-semibold text-text-primary">
          {publication}
        </span>
      );
  }
}

export default function PressSection() {
  return (
    <section className="py-[80px] lg:py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-olive font-medium text-sm tracking-wide uppercase mb-3">
            In the News
          </p>
          <h2 className="font-serif text-[36px] md:text-[44px] text-text-primary">
            The Evidence Is Clear
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-[1.7]">
            Australia&apos;s data centre energy gap is well-documented. Here&apos;s
            what leading publications and research bodies are saying.
          </p>
        </FadeIn>

        {/* Article Grid */}
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative flex flex-col p-6 bg-cream rounded-lg border border-divider hover:border-olive/30 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Publication + Date Row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <PublicationLogo
                  publication={article.publication}
                  color={article.color}
                />
                <span className="text-xs text-text-muted whitespace-nowrap">
                  {article.date}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-serif text-[17px] leading-[1.35] text-text-primary group-hover:text-olive transition-colors duration-200 line-clamp-2">
                {article.headline}
              </h3>

              {/* Pull Quote */}
              <p className="mt-3 text-[14px] text-text-secondary leading-[1.6] flex-1">
                {article.pullQuote}
              </p>

              {/* Read indicator */}
              <div className="mt-4 flex items-center gap-1.5 text-olive text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Read article
                <ExternalLink size={12} />
              </div>

              {/* Left accent */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: article.color }}
              />
            </motion.a>
          ))}
        </div>

        {/* Bottom Summary */}
        <FadeIn delay={0.4}>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-olive-tint rounded-lg border border-olive/10">
            <div className="w-10 h-10 bg-olive rounded-full flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <p className="text-text-primary font-medium text-[15px]">
                The consensus is unanimous
              </p>
              <p className="text-text-secondary text-[14px] leading-[1.6] mt-1">
                Every major energy body, financial institution, and news
                organisation agrees: Australia needs dedicated power
                infrastructure for data centres.{" "}
                <span className="text-olive font-medium">
                  Brightwood is building exactly that.
                </span>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
