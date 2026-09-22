import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 80,
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
  id="about"
  className="relative overflow-hidden bg-[#0b0b0a] px-6 py-36 md:px-12 lg:px-16"
>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          
          <div className="about-reveal">
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
              About Halal MeatHub
            </p>

            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-5xl md:text-7xl lg:text-8xl">
              Freshness
              <br />
              <span className="text-white/30">you can trust.</span>
            </h2>
          </div>

          <div className="about-reveal max-w-2xl">
            <p className="text-lg leading-8 text-white/80 sm:text-xl md:text-3xl md:leading-[1.35]">
              Halal MeatHub is built around one simple idea — quality meat
              should speak for itself.
            </p>

            <p className="mt-8 max-w-xl text-sm leading-8 text-white/45">
              From carefully selected cuts to fresh preparation, every detail
              is handled with quality and halal standards in mind. What began
              as a meat brand is becoming a community people can discover,
              trust and follow.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-[#c7a875]" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Quality • Freshness • Halal
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;