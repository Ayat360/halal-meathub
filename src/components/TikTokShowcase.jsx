import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TikTokShowcase = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tiktok-reveal", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
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
      className="bg-[#11110f] px-6 py-32 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="tiktok-reveal">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
              Follow The Journey
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-8xl">
              Seen on
              <br />
              <span className="text-white/30">TikTok.</span>
            </h2>
          </div>

          <div className="tiktok-reveal max-w-sm">
            <p className="text-sm leading-7 text-white/45">
              Follow Halal MeatHub for fresh cuts, behind-the-scenes moments,
              new updates and everything happening at the Hub.
            </p>
          </div>
        </div>

        {/* TikTok profile card */}
        <div className="tiktok-reveal relative overflow-hidden border border-white/10 bg-[#0b0b0a]">
          
          <div className="grid min-h-[420px] lg:grid-cols-[1fr_1.2fr]">

            {/* Left */}
            <div className="flex flex-col justify-between p-8 md:p-12">
              
              <div>
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-xl">
                  ♪
                </div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  TikTok
                </p>

                <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                  @halal_meathub0
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">
                  Fresh meat. Real moments. Follow Halal MeatHub on TikTok.
                </p>
              </div>

              <a
                href="https://www.tiktok.com/@halal_meathub0"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 flex w-fit items-center gap-5 border border-white/20 px-6 py-4 text-[10px] uppercase tracking-[0.25em] transition duration-500 hover:bg-white hover:text-black"
              >
                Follow on TikTok

                <span className="transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>

            {/* Right visual */}
            <div className="relative min-h-[320px] overflow-hidden bg-[#171715]">
              <img
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1400&q=85"
                alt="Halal MeatHub food"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/35" />

              <div className="absolute bottom-8 left-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  15K+ Followers
                </p>

                <p className="mt-2 text-3xl font-black">
                  170K+ Likes
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TikTokShowcase;
