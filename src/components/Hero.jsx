import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

import logo from "../assets/halal-meathub-logo.png";

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Today's Sharing", href: "#today" },
    { label: "Our Meat", href: "#meat" },
    { label: "The Hub", href: "#hub" },
    { label: "TikTok", href: "#tiktok" },
  ];

  return (
    <section className="bg-[#111111] pt-[88px] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 top-0 z-[90] w-full border-b border-white/10 bg-[#111111]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[88px] max-w-[1500px] items-center justify-between px-6 lg:px-12">
          
          {/* LOGO */}
          <a href="#" className="shrink-0">
            <img
              src={logo}
              alt="Halal MeatHub"
              className="h-11 w-auto"
            />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-white/75 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CONTACT */}
          <a
            href="https://wa.me/2349031957147"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-[#a92d3b] px-6 py-3 text-[14px] font-semibold transition hover:bg-[#8f2531] lg:flex"
          >
            WhatsApp
            <ArrowUpRight size={16} />
          </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center border border-white/20 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[100] bg-[#111111] transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1500px] flex-col px-6">
          
          <div className="flex h-[88px] items-center justify-between border-b border-white/10">
            <img
              src={logo}
              alt="Halal MeatHub"
              className="h-11 w-auto"
            />

            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center border border-white/20"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mt-12">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-6 text-2xl font-semibold"
              >
                <span>{link.label}</span>

                <span className="text-white/30">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>

          <a
            href="https://wa.me/2349031957147"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto mb-8 flex items-center justify-center gap-2 bg-[#a92d3b] py-4 text-base font-semibold"
          >
            WhatsApp the Hub
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* HERO */}
      <div className="mx-auto max-w-[1500px] px-6 pb-8 pt-10 lg:px-12 lg:pb-12 lg:pt-14">

        {/* INTRO */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          <div>
            <p className="mb-6 text-base font-medium text-[#c99a5b]">
              Fresh meat sharing in Lagos
            </p>

            <h1 className="max-w-[850px] text-[clamp(3.5rem,7vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.055em]">
              Know what is
              <br />
              <span className="text-white/45">
                available today.
              </span>
            </h1>
          </div>

          <div className="max-w-[430px] lg:ml-auto">
            <p className="text-lg leading-8 text-white/65">
              Halal MeatHub lets you check the meat being shared,
              see availability, and know whether collection or
              dispatch is available before you make the trip.
            </p>

            <a
              href="#today"
              className="mt-7 inline-flex items-center gap-3 bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#c99a5b]"
            >
              See today's sharing
              <ArrowUpRight size={17} />
            </a>
          </div>

        </div>

        {/* HERO IMAGE */}
        <div className="relative mt-10 overflow-hidden lg:mt-14">

          <img
            src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=2400&q=90"
            alt="Fresh meat"
            className="h-[430px] w-full object-cover sm:h-[520px] lg:h-[650px]"
          />

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

              <div>
                <p className="text-sm font-medium text-white/60">
                  WHAT WE SHARE
                </p>

                <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Cow · Goat · Ram
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-white/60">
                  Balogun Bus Stop · Ikotun
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  Lagos
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;