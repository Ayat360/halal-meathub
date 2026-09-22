import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "15K+",
    label: "TikTok Followers",
  },
  {
    number: "170K+",
    label: "TikTok Likes",
  },
  {
    number: "100%",
    label: "Halal Quality",
  },
];

const Stats = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b0b0a] px-6 py-20 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
            The Hub
          </p>

          <h2 className="text-4xl font-medium uppercase leading-tight tracking-[-0.04em] md:text-6xl">
            Quality that
            <br />
            speaks for itself.
          </h2>
        </div>

        <div className="grid border-t border-white/15 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item border-b border-white/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0"
            >
              <div className="text-5xl font-black tracking-[-0.06em] sm:text-6xl md:text-7xl">
                {stat.number}
              </div>

              <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;