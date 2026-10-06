import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import goatImage from "../assets/meat/goat.jpg";
import beefImage from "../assets/meat/beef.jpg";
import ramImage from "../assets/meat/ram.jpg";

gsap.registerPlugin(ScrollTrigger);

function MeatShowcase() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);

  const meats = [
    {
      name: "Cow",
      image: beefImage,
      description:
        "Rich, substantial cuts prepared and divided into practical shares.",
    },
    {
      name: "Goat",
      image: goatImage,
      description:
        "Fresh goat meat prepared for customers sharing at the Hub.",
    },
    {
      name: "Ram",
      image: ramImage,
      description:
        "Fresh ram portions shared while supplies last.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 55,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(introRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(cardsRef.current?.children || [], {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          once: true,
        },
      });

      const images = sectionRef.current.querySelectorAll(
        ".meat-showcase-image"
      );

      images.forEach((image) => {
        gsap.to(image, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".meat-showcase-card"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="meat"
      className="overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-6 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div ref={headingRef}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-[#c99a5b]">
              What we share
            </p>

            <h2 className="max-w-[850px] text-[clamp(3.2rem,7vw,7rem)] font-bold leading-[0.88] tracking-[-0.06em]">
              Fresh meat.
              <br />
              <span className="text-white/35">
                Shared simply.
              </span>
            </h2>
          </div>

          <div ref={introRef} className="max-w-[440px] lg:ml-auto">
            <p className="text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Cow, goat and ram are prepared and divided into
              shares for customers at the Hub. Availability and
              pricing can change with each sharing.
            </p>

            <a
              href="#today"
              className="mt-7 inline-flex items-center gap-3 border border-white/20 px-5 py-4 text-sm font-bold transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Check today's availability
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* MEAT GRID */}
        <div
          ref={cardsRef}
          className="mt-10 grid gap-5 lg:grid-cols-12"
        >
          {/* COW */}
          <article className="meat-showcase-card group overflow-hidden bg-[#1a1a1a] lg:col-span-7">
            <div className="relative h-[520px] overflow-hidden sm:h-[620px] lg:h-[720px]">
              <img
                src={meats[0].image}
                alt="Fresh beef"
                className="meat-showcase-image h-[115%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">
                      Meat share
                    </p>

                    <h3 className="mt-2 text-5xl font-bold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                      Cow
                    </h3>

                    <p className="mt-4 max-w-[420px] text-sm leading-6 text-white/65 sm:text-base">
                      {meats[0].description}
                    </p>
                  </div>

                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 group-hover:bg-white group-hover:text-black sm:flex">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN */}
          <div className="grid gap-5 lg:col-span-5">
            {/* GOAT */}
            <article className="meat-showcase-card group overflow-hidden bg-[#1a1a1a]">
              <div className="relative h-[390px] overflow-hidden sm:h-[450px] lg:h-[347px]">
                <img
                  src={meats[1].image}
                  alt="Fresh goat meat"
                  className="meat-showcase-image h-[115%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">
                        Meat share
                      </p>

                      <h3 className="mt-1 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                        Goat
                      </h3>

                      <p className="mt-3 max-w-[360px] text-sm leading-6 text-white/60">
                        {meats[1].description}
                      </p>
                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* RAM */}
            <article className="meat-showcase-card group overflow-hidden bg-[#1a1a1a]">
              <div className="relative h-[390px] overflow-hidden sm:h-[450px] lg:h-[347px]">
                <img
                  src={meats[2].image}
                  alt="Fresh ram meat"
                  className="meat-showcase-image h-[115%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">
                        Meat share
                      </p>

                      <h3 className="mt-1 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                        Ram
                      </h3>

                      <p className="mt-3 max-w-[360px] text-sm leading-6 text-white/60">
                        {meats[2].description}
                      </p>
                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <div className="flex flex-col justify-between gap-4 text-sm sm:flex-row sm:items-center">
            <p className="max-w-[600px] leading-6 text-white/45">
              Today's portions, prices and availability are shown
              in the live sharing section above.
            </p>

            <a
              href="https://wa.me/2349031957147"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 font-bold text-white transition-colors hover:text-[#c99a5b]"
            >
              Ask the Hub
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeatShowcase;