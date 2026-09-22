import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import goatImage from "../assets/meat/goat.jpg";
import beefImage from "../assets/meat/beef.jpg";
import ramImage from "../assets/meat/ram.jpg";

gsap.registerPlugin(ScrollTrigger);

const meats = [
  {
    number: "01",
    name: "Goat",
    subtitle: "Tender. Fresh. Distinct.",
    image: goatImage,
  },
  {
    number: "02",
    name: "Beef",
    subtitle: "Rich. Premium. Carefully selected.",
    image: beefImage,
  },
  {
    number: "03",
    name: "Ram",
    subtitle: "Freshly prepared. Full of flavour.",
    image: ramImage,
  },
];

const MeatShowcase = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      const getDistance = () => {
        return track.scrollWidth - window.innerWidth;
      };

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="meat"
      className="relative h-screen overflow-hidden bg-[#11110f]"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max items-center"
      >
        {/* Intro panel */}
        <div className="flex h-full w-screen shrink-0 items-center px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
              Our Selection
            </p>

            <h2 className="text-[clamp(4rem,10vw,9rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
              Meat
              <br />
              <span className="text-white/30">Matters.</span>
            </h2>

            <p className="mt-8 max-w-md text-sm leading-7 text-white/50">
              Every cut begins with quality. Explore the selection that makes
              Halal MeatHub what it is.
            </p>
          </div>
        </div>

        {/* Meat cards */}
        {meats.map((meat) => (
          <article
  key={meat.name}
  className="group relative h-[80vh] w-[88vw] shrink-0 overflow-hidden md:w-[68vw] lg:w-[58vw]"
>
            <img
  src={meat.image}
  alt={`${meat.name} meat`}
  className="absolute inset-0 h-full w-full object-cover transition duration-[1600ms] ease-out group-hover:scale-105"
/>

            <div className="absolute inset-0 bg-black/20 transition duration-700 group-hover:bg-black/10" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

            <div className="absolute left-6 top-6 text-xs tracking-[0.3em] text-white/60 md:left-10 md:top-10">
              {meat.number}
            </div>

            <div className="absolute bottom-8 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#d8c7a5]">
                Halal MeatHub
              </p>

              <h3 className="text-5xl font-black uppercase leading-none tracking-[-0.065em] sm:text-6xl md:text-8xl lg:text-9xl">
                {meat.name}
              </h3>

              <p className="mt-5 text-sm text-white/60">
                {meat.subtitle}
              </p>
            </div>
          </article>
        ))}

        {/* Ending panel */}
        <div className="flex h-full w-screen shrink-0 items-center justify-center px-6 text-center">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
              Freshness First
            </p>

            <h2 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-8xl">
              Choose
              <br />
              <span className="text-white/30">Your Cut.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeatShowcase;