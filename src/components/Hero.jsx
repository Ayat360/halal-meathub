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
        <a href="#" className="flex items-center">
  <img
    src={logo}
    alt="Halal MeatHub"
    className="h-10 w-auto object-contain md:h-12"
  />
</a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
          <a href="#about" className="transition hover:text-white">
            About
          </a>

          <a href="#meat" className="transition hover:text-white">
            Our Meat
          </a>

          <a href="#gallery" className="transition hover:text-white">
            Gallery
          </a>

          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden border border-white/30 px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-white hover:text-black md:inline-flex"
        >
          Visit Us
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] md:hidden"
          onClick={() => {
            document
              .getElementById("mobile-menu")
              ?.classList.toggle("translate-y-0");

            document
              .getElementById("mobile-menu")
              ?.classList.toggle("-translate-y-full");
          }}
        >
          Menu
          <span className="text-lg">☰</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 flex -translate-y-full flex-col items-center justify-center gap-8 bg-[#0b0b0a] transition-transform duration-500 md:hidden"
      >
        <a
          href="#about"
          className="text-3xl font-black uppercase"
          onClick={() => {
            document
              .getElementById("mobile-menu")
              ?.classList.add("-translate-y-full");

            document
              .getElementById("mobile-menu")
              ?.classList.remove("translate-y-0");
          }}
        >
          About
        </a>

        <a
          href="#meat"
          className="text-3xl font-black uppercase"
          onClick={() => {
            document
              .getElementById("mobile-menu")
              ?.classList.add("-translate-y-full");

            document
              .getElementById("mobile-menu")
              ?.classList.remove("translate-y-0");
          }}
        >
          Our Meat
        </a>

        <a
          href="#gallery"
          className="text-3xl font-black uppercase"
          onClick={() => {
            document
              .getElementById("mobile-menu")
              ?.classList.add("-translate-y-full");

            document
              .getElementById("mobile-menu")
              ?.classList.remove("translate-y-0");
          }}
        >
          Gallery
        </a>

        <a
          href="#contact"
          className="text-3xl font-black uppercase"
          onClick={() => {
            document
              .getElementById("mobile-menu")
              ?.classList.add("-translate-y-full");

            document
              .getElementById("mobile-menu")
              ?.classList.remove("translate-y-0");
          }}
        >
          Contact
        </a>
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
            className="max-w-5xl text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-[0.8] tracking-[-0.07em]"
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