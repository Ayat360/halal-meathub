import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/halal-meathub-logo.png";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const navRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapRef = useRef(null);
  const bottomInfoRef = useRef(null);

  const navLinks = [
    { label: "Today's Sharing", href: "#today" },
    { label: "Our Meat", href: "#meat" },
    { label: "The Hub", href: "#hub" },
    { label: "TikTok", href: "#tiktok" },
    { label: "Book a Share", href: "#reservation" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(navRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          delay: 2.45,
        })
        .from(
          eyebrowRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.3"
        )
        .from(
          titleRef.current,
          {
            y: 55,
            opacity: 0,
            duration: 1,
          },
          "-=0.45"
        )
        .from(
          descriptionRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          buttonRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          imageWrapRef.current,
          {
            y: 45,
            opacity: 0,
            duration: 1,
          },
          "-=0.45"
        )
        .from(
          bottomInfoRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        );

      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(titleRef.current, {
        yPercent: -12,
        opacity: 0.82,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "65% top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#111111] pt-[88px] text-white"
    >
      {/* NAVBAR */}
      <header
        ref={navRef}
        className="fixed left-0 top-0 z-[90] w-full border-b border-white/10 bg-[#111111]/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-[88px] max-w-[1500px] items-center justify-between px-5 sm:px-6 lg:px-12">
          <a href="#" className="shrink-0">
            <img
              src={logo}
              alt="Halal MeatHub"
              className="h-10 w-auto sm:h-11"
            />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-white/70 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* DESKTOP WHATSAPP */}
          <a
            href="https://wa.me/2349031957147"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-[#a92d3b] px-6 py-3 text-[14px] font-semibold transition-all duration-300 hover:bg-[#8f2531] lg:flex"
          >
            WhatsApp
            <ArrowUpRight size={16} />
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center border border-white/20 transition-colors hover:bg-white hover:text-black lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[100] bg-[#111111] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1500px] flex-col px-5 sm:px-6">
          <div className="flex h-[88px] items-center justify-between border-b border-white/10">
            <img
              src={logo}
              alt="Halal MeatHub"
              className="h-10 w-auto"
            />

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center border border-white/20 transition-colors hover:bg-white hover:text-black"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mt-10">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-6 text-[clamp(1.5rem,7vw,2.2rem)] font-semibold tracking-[-0.03em]"
              >
                <span>{link.label}</span>

                <span className="text-sm font-medium text-white/25">
                  0{index + 1}
                </span>
              </a>
            ))}
          </nav>

          <a
            href="https://wa.me/2349031957147"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto mb-8 flex items-center justify-center gap-2 bg-[#a92d3b] py-4 text-base font-semibold transition-colors hover:bg-[#8f2531]"
          >
            WhatsApp the Hub
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-10 sm:px-6 lg:px-12 lg:pb-14 lg:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          {/* LEFT */}
          <div>
            <p
              ref={eyebrowRef}
              className="mb-6 text-sm font-bold uppercase tracking-[0.12em] text-[#c99a5b] sm:text-base"
            >
              Fresh meat sharing in Lagos
            </p>

            <h1
              ref={titleRef}
              className="max-w-[900px] text-[clamp(3.4rem,7vw,7.4rem)] font-bold leading-[0.88] tracking-[-0.06em]"
            >
              Know what is
              <br />
              <span className="text-white/40">
                available today.
              </span>
            </h1>
          </div>

          {/* RIGHT */}
          <div className="max-w-[450px] lg:ml-auto">
            <p
              ref={descriptionRef}
              className="text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
            >
              Check what meat is being shared, see what is
              available, and know whether collection or dispatch
              is available before you make the trip.
            </p>

            <a
              ref={buttonRef}
              href="#today"
              className="mt-7 inline-flex items-center gap-3 bg-white px-6 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-[#c99a5b]"
            >
              See today's sharing
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          ref={imageWrapRef}
          className="relative mt-10 overflow-hidden lg:mt-14"
        >
          <div className="h-[430px] overflow-hidden sm:h-[520px] lg:h-[650px]">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=2400&q=90"
              alt="Fresh meat prepared for sharing"
              className="h-[115%] w-full object-cover"
            />
          </div>

          {/* IMAGE GRADIENT */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />

          {/* IMAGE INFORMATION */}
          <div
            ref={bottomInfoRef}
            className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">
                  What we share
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Cow · Goat · Ram
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-white/60">
                  Balogun Bus Stop · Potoku Market
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  Ikotun, Lagos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SMALL SCROLL CUE */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
          <span>Halal MeatHub</span>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;