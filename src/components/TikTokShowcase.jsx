import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: "7687880272934604040",
    title: "Fresh Selection",
  },
  {
    id: "7686129265795992840",
    title: "Behind The Hub",
  },
  {
    id: "7683533693570338056",
    title: "Halal Quality",
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

        {/* Heading */}
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

        {/* TikTok Videos */}
        <div className="grid gap-6 md:grid-cols-3">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="tiktok-reveal group overflow-hidden bg-black"
            >
              {/* Video */}
              <div className="relative aspect-[9/16] w-full overflow-hidden">
                <iframe
                  src={`https://www.tiktok.com/player/v1/${video.id}?autoplay=0&loop=1&description=1&music_info=1&controls=1`}
                  className="absolute inset-0 h-full w-full"
                  title={`Halal MeatHub TikTok video ${index + 1}`}
                  allow="fullscreen"
                  scrolling="no"
                  frameBorder="0"
                />
              </div>

              {/* Video label */}
              <div className="flex items-center justify-between border-t border-white/10 px-5 py-5">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#c7a875]">
                    0{index + 1} / TikTok
                  </p>

                  <h3 className="mt-2 text-sm font-bold uppercase tracking-wide">
                    {video.title}
                  </h3>
                </div>

                <a
                  href={`https://www.tiktok.com/@halal_meathub0/video/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-white/40 transition hover:text-white"
                  aria-label={`Open ${video.title} on TikTok`}
                >
                  ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Profile CTA */}
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