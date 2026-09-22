import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/halal-meathub-logo.png";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const buttonRef = useRef(null);
  const navRef = useRef(null);

  // Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current?.classList.add(
          "bg-[#0b0b0a]/85",
          "backdrop-blur-md",
          "border-b",
          "border-white/10"
        );
      } else {
        navRef.current?.classList.remove(
          "bg-[#0b0b0a]/85",
          "backdrop-blur-md",
          "border-b",
          "border-white/10"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hero GSAP animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        eyebrowRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        }
      )
        .fromTo(
          titleRef.current.querySelectorAll(".hero-word"),
          {
            opacity: 0,
            y: 100,
            rotateX: 80,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.12,
          },
          "-=0.6"
        )
        .fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 1.15,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
          },
          "-=1"
        )
        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.7"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#0b0b0a]"
    >
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=2400&q=90"
          alt="Fresh premium meat"
          className="h-full w-full object-cover"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a] via-transparent to-black/20" />
      </div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-transparent px-6 py-7 transition-all duration-500 md:px-12 lg:px-16"
      >
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="Halal MeatHub"
            className="h-10 w-auto object-contain sm:h-14"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
          <a
            href="#about"
            className="font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#c7a875]"
          >
            About
          </a>

          <a
            href="#meat"
            className="font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#c7a875]"
          >
            Our Meat
          </a>

          <a
            href="#gallery"
            className="font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#c7a875]"
          >
            Gallery
          </a>

          <a
            href="#contact"
            className="font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#c7a875]"
          >
            Contact
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Visit Us */}
          <a
            href="#contact"
            className="hidden border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#c7a875] hover:text-[#c7a875] md:block"
          >
            Visit Us
          </a>

         {/* Mobile Menu Button */}
<button
  type="button"
  onClick={() => {
    document
      .getElementById("mobile-menu")
      ?.classList.toggle("pointer-events-none");

    document
      .getElementById("mobile-menu")
      ?.classList.toggle("opacity-0");

    document
      .getElementById("mobile-menu")
      ?.classList.toggle("scale-0");

    document
      .getElementById("mobile-menu")
      ?.classList.toggle("scale-100");
  }}
  className="relative z-[70] flex items-center gap-3 border border-white/20 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#c7a875] hover:text-[#c7a875] md:hidden"
>
  Menu
  <span className="text-sm">+</span>
</button>
        </div>
      </nav>

      {/* Premium Circular Mobile Menu */}
<div
  id="mobile-menu"
  className="pointer-events-none fixed inset-0 z-[60] scale-0 opacity-0 transition-all duration-500 ease-out md:hidden"
>
  {/* Dark cinematic backdrop */}
  <div className="absolute inset-0 bg-[#080807]/95 backdrop-blur-sm" />

  {/* Circular navigation */}
  <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2">
    
    {/* Outer circle */}
    <div className="absolute inset-0 rounded-full border border-white/10" />

    {/* Decorative rings */}
    <div className="absolute inset-6 rounded-full border border-[#c7a875]/10" />
    <div className="absolute inset-12 rounded-full border border-white/5" />

    {/* Center */}
    <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#c7a875]/40 bg-[#11110f] shadow-[0_0_60px_rgba(199,168,117,0.12)]">
      <div className="text-center">
        <span className="block text-[8px] font-bold uppercase tracking-[0.3em] text-white/40">
          Halal
        </span>
        <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.2em] text-[#c7a875]">
          MeatHub
        </span>
      </div>
    </div>

    {/* ABOUT */}
    <a
      href="#about"
      onClick={() => {
        document
          .getElementById("mobile-menu")
          ?.classList.add("pointer-events-none", "opacity-0", "scale-0");
        document
          .getElementById("mobile-menu")
          ?.classList.remove("scale-100");
      }}
      className="group absolute left-1/2 top-[-10px] flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-[#11110f] text-center transition-all duration-500 hover:border-[#c7a875] hover:scale-110"
    >
      <span className="text-[9px] font-black uppercase tracking-[0.15em] group-hover:text-[#c7a875]">
        About
      </span>
    </a>

    {/* GALLERY */}
    <a
      href="#gallery"
      onClick={() => {
        document
          .getElementById("mobile-menu")
          ?.classList.add("pointer-events-none", "opacity-0", "scale-0");
        document
          .getElementById("mobile-menu")
          ?.classList.remove("scale-100");
      }}
      className="group absolute right-[-8px] top-1/2 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#11110f] text-center transition-all duration-500 hover:border-[#c7a875] hover:scale-110"
    >
      <span className="text-[9px] font-black uppercase tracking-[0.15em] group-hover:text-[#c7a875]">
        Gallery
      </span>
    </a>

    {/* CONTACT */}
    <a
      href="#contact"
      onClick={() => {
        document
          .getElementById("mobile-menu")
          ?.classList.add("pointer-events-none", "opacity-0", "scale-0");
        document
          .getElementById("mobile-menu")
          ?.classList.remove("scale-100");
      }}
      className="group absolute bottom-[-10px] left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-[#11110f] text-center transition-all duration-500 hover:border-[#c7a875] hover:scale-110"
    >
      <span className="text-[9px] font-black uppercase tracking-[0.15em] group-hover:text-[#c7a875]">
        Contact
      </span>
    </a>

    {/* OUR MEAT */}
    <a
      href="#meat"
      onClick={() => {
        document
          .getElementById("mobile-menu")
          ?.classList.add("pointer-events-none", "opacity-0", "scale-0");
        document
          .getElementById("mobile-menu")
          ?.classList.remove("scale-100");
      }}
      className="group absolute left-[-8px] top-1/2 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#11110f] text-center transition-all duration-500 hover:border-[#c7a875] hover:scale-110"
    >
      <span className="text-[9px] font-black uppercase tracking-[0.15em] group-hover:text-[#c7a875]">
        Our Meat
      </span>
    </a>

    {/* Close */}
    <button
      type="button"
      onClick={() => {
        document
          .getElementById("mobile-menu")
          ?.classList.add("pointer-events-none", "opacity-0", "scale-0");

        document
          .getElementById("mobile-menu")
          ?.classList.remove("scale-100");
      }}
      className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xl font-light text-white/50 transition-colors hover:text-[#c7a875]"
    >
      ×
    </button>
  </div>

  {/* Bottom label */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
    <p className="text-[8px] uppercase tracking-[0.4em] text-white/30">
      Fresh • Halal • Quality
    </p>
  </div>
</div>

      {/* Premium Mobile Menu */}
      <div
        id="mobile-menu"
        className="fixed inset-y-0 right-0 z-[60] flex w-[88%] max-w-sm translate-x-full flex-col bg-[#11110f] px-8 py-8 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-white/50">
            Navigation
          </span>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("mobile-menu")
                ?.classList.add("translate-x-full");

              document
                .getElementById("mobile-menu")
                ?.classList.remove("translate-x-0");
            }}
            className="text-3xl font-light text-white transition-colors hover:text-[#c7a875]"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 flex-col justify-center">
          <a
            href="#about"
            onClick={() => {
              document
                .getElementById("mobile-menu")
                ?.classList.add("translate-x-full");

              document
                .getElementById("mobile-menu")
                ?.classList.remove("translate-x-0");
            }}
            className="border-b border-white/10 py-6 text-3xl font-black uppercase tracking-[-0.04em] transition-colors hover:text-[#c7a875]"
          >
            About
          </a>

          <a
            href="#meat"
            onClick={() => {
              document
                .getElementById("mobile-menu")
                ?.classList.add("translate-x-full");

              document
                .getElementById("mobile-menu")
                ?.classList.remove("translate-x-0");
            }}
            className="border-b border-white/10 py-6 text-3xl font-black uppercase tracking-[-0.04em] transition-colors hover:text-[#c7a875]"
          >
            Our Meat
          </a>

          <a
            href="#gallery"
            onClick={() => {
              document
                .getElementById("mobile-menu")
                ?.classList.add("translate-x-full");

              document
                .getElementById("mobile-menu")
                ?.classList.remove("translate-x-0");
            }}
            className="border-b border-white/10 py-6 text-3xl font-black uppercase tracking-[-0.04em] transition-colors hover:text-[#c7a875]"
          >
            Gallery
          </a>

          <a
            href="#contact"
            onClick={() => {
              document
                .getElementById("mobile-menu")
                ?.classList.add("translate-x-full");

              document
                .getElementById("mobile-menu")
                ?.classList.remove("translate-x-0");
            }}
            className="border-b border-white/10 py-6 text-3xl font-black uppercase tracking-[-0.04em] transition-colors hover:text-[#c7a875]"
          >
            Contact
          </a>
        </div>

        {/* Bottom Brand Line */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Fresh • Halal • Quality
          </p>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[calc(100vh-90px)] items-end px-6 pb-16 md:px-12 md:pb-20 lg:px-16 lg:pb-24">
        <div className="max-w-6xl">
          <p
            ref={eyebrowRef}
            className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-[#d8c7a5]"
          >
            Fresh • Halal • Quality
          </p>

          <h1
            ref={titleRef}
            className="max-w-4xl text-[3.4rem] font-black uppercase leading-[0.88] tracking-[-0.055em] sm:text-[4.8rem] md:text-[7rem] lg:text-[9rem]"
            style={{
              perspective: "1000px",
            }}
          >
            <span className="hero-word inline-block">Certify</span>
            <br />
            <span className="hero-word inline-block">Your</span>{" "}
            <span className="hero-word inline-block text-[#c7a875]">
              Craving.
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/65 md:text-base">
              Premium goat meat, cow meat and ram — carefully selected,
              freshly prepared and served with quality you can trust.
            </p>

            <div ref={buttonRef}>
              <a
                href="#meat"
                className="group inline-flex items-center gap-5 border border-white/30 px-7 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white hover:text-black"
              >
                Explore Meat
                <span className="transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom information */}
      <div className="absolute bottom-6 right-6 z-10 hidden text-right md:block">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
          Lagos, Nigeria
        </p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/40">
          Est. Halal MeatHub
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-6 z-10 flex items-center gap-3 md:left-12">
        <span className="h-px w-10 bg-white/40" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
      </div>
    </section>
  );
};

export default Hero;