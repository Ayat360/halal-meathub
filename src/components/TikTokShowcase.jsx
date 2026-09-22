import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: "7687880272934604040",
    title: "Fresh Selection",
    url: "https://www.tiktok.com/@halal_meathub0/video/7687880272934604040",
  },
  {
    id: "7686129265795992840",
    title: "Behind The Hub",
    url: "https://www.tiktok.com/@halal_meathub0/video/7686129265795992840",
  },
  {
    id: "7683533693570338056",
    title: "Halal Quality",
    url: "https://www.tiktok.com/@halal_meathub0/video/7683533693570338056",
  },
];

const TikTokShowcase = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tiktok-reveal", {
        y: 80,
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

        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="tiktok-reveal">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
              Follow The Journey
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-8xl">
              From The
              <br />
              <span className="text-white/30">TikTok.</span>
            </h2>
          </div>

          <p className="tiktok-reveal max-w-sm text-sm leading-7 text-white/45">
            Real moments from Halal MeatHub. Fresh cuts, preparation,
            behind-the-scenes and life at the Hub.
          </p>
        </div>

        {/* TikTok videos */}
        <div className="grid gap-5 md:grid-cols-3">
          {videos.map((video, index) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tiktok-reveal group relative aspect-[9/16] overflow-hidden bg-[#080808]"
            >
              {/* TikTok visual */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_55%)]" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <span className="ml-1 text-xl">
                    ▶
                  </span>
                </div>
              </div>

              {/* Number */}
              <div className="absolute left-5 top-5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                  0{index + 1}
                </span>
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

              {/* Content */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#c7a875]">
                  TikTok
                </p>

                <h3 className="mt-2 text-xl font-bold uppercase">
                  {video.title}
                </h3>

                <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    @halal_meathub0
                  </span>

                  <span className="text-sm">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* TikTok profile CTA */}
        <div className="tiktok-reveal mt-10 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              Official TikTok
            </p>

            <p className="mt-2 text-lg font-medium">
              @halal_meathub0
            </p>
          </div>

          <a
            href="https://www.tiktok.com/@halal_meathub0"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-7 py-4 text-[10px] uppercase tracking-[0.25em] transition duration-500 hover:bg-white hover:text-black"
          >
            Follow The Hub ↗
          </a>
        </div>

      </div>
    </section>
  );
};

export default TikTokShowcase;