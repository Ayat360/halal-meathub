import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import goatImage from "../assets/meat/goat.jpg";
import beefImage from "../assets/meat/beef.jpg";
import ramImage from "../assets/meat/ram.jpg";

gsap.registerPlugin(ScrollTrigger);

function Gallery() {
  const sectionRef = useRef(null);

  const images = [
    {
      src: goatImage,
      title: "Fresh Goat",
      size: "large",
    },
    {
      src: beefImage,
      title: "Fresh Beef",
      size: "small",
    },
    {
      src: ramImage,
      title: "Fresh Ram",
      size: "small",
    },
    {
      src: beefImage,
      title: "Quality Selection",
      size: "wide",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#0b0b0a] text-white"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c7a875]">
              The Hub
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
              Fresh in view.
            </h2>
          </div>

          <p className="hidden max-w-xs text-right text-xs leading-5 text-white/35 sm:block">
            A look at the meat and the work behind every sharing.
          </p>
        </div>

        {/* GALLERY */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={`${image.title}-${index}`}
              className={`gallery-item group relative overflow-hidden ${
                image.size === "large"
                  ? "col-span-2 row-span-2 h-[430px] sm:h-[520px]"
                  : image.size === "wide"
                    ? "col-span-2 h-[210px] sm:h-[250px]"
                    : "h-[210px] sm:h-[250px]"
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <p className="text-xs font-black uppercase tracking-[0.12em]">
                  {image.title}
                </p>

                <span className="text-[9px] font-black text-white/45">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;