import Link from "next/link";

const footerLinks = {
  Company: [
    { label: "About", href: "/" },
    { label: "Contact", href: "/contact" },
  ],
  Learn: [
    { label: "The Opportunity", href: "/opportunity" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  Investors: [
    { label: "Scale & Returns", href: "/scale" },
    { label: "Competitive Landscape", href: "/landscape" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-divider">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-xl text-olive">
              Brightwood
            </Link>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Dedicated power infrastructure for AI data centres in regional
              Australia.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium text-text-primary mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-secondary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-divider flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; 2026 Brightwood Energy Pty Ltd
          </p>
          <p className="text-sm text-text-muted">Brisbane, Australia</p>
        </div>
      </div>
    </footer>
  );
}
