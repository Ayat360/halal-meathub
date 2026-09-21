import goatImage from "../assets/meat/goat.jpg";
import beefImage from "../assets/meat/beef.jpg";
import ramImage from "../assets/meat/ram.jpg";import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: goatImage,
    title: "Fresh Goat",
    size: "large",
  },
  {
    src: beefImage,
    title: "Premium Beef",
    size: "small",
  },
  {
    src: ramImage,
    title: "Fresh Ram",
    size: "small",
  },
  {
    src: goatImage,
    title: "Quality Selection",
    size: "large",
  },
];

const Gallery = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-[#0b0b0a] px-6 py-32 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
              Visual Journal
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-8xl">
              Inside
              <br />
              <span className="text-white/30">The Hub.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/40">
            A glimpse into the freshness, preparation and quality behind
            Halal MeatHub.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {galleryImages.map((image, index) => (
            <div
              key={image.title}
              className={`gallery-item group relative overflow-hidden ${
                image.size === "large"
                  ? "md:row-span-2"
                  : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  image.size === "large"
                    ? "h-[520px] md:h-[760px]"
                    : "h-[360px] md:h-[420px]"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;