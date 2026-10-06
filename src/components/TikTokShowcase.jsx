import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: "7687880272934604040",
    title: "Latest sharing",
  },
  {
    id: "7686129265795992840",
    title: "From the Hub",
  },
  {
    id: "7683533693570338056",
    title: "Meat sharing",
  },
];

function TikTokShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tiktok-heading", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".tiktok-intro", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".tiktok-card", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tiktok-grid",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tiktok"
      className="bg-[#171717] px-5 py-24 text-[#f4f0e8] sm:px-8 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#c98b58]">
              <span className="h-2 w-2 bg-[#c98b58]" />
              On TikTok
            </div>

            <h2 className="tiktok-heading max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              See the sharing
              <br />
              beyond the screen.
            </h2>
          </div>

          <div>
            <p className="tiktok-intro max-w-lg text-base leading-8 text-white/55 sm:text-lg">
              Follow Halal MeatHub on TikTok for videos from the Hub, meat
              sharing updates and what is happening on the day.
            </p>
          </div>
        </div>

        {/* VIDEOS */}
        <div className="tiktok-grid mt-14 grid gap-5 md:grid-cols-3 lg:mt-20">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.tiktok.com/@halal_meathub0/video/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tiktok-card group relative block overflow-hidden bg-[#242424]"
            >
              <div className="relative aspect-[9/13] overflow-hidden">
                <iframe
                  src={`https://www.tiktok.com/player/v1/${video.id}?description=1&music_info=1`}
                  title={video.title}
                  className="absolute inset-0 h-full w-full border-0"
                  scrolling="no"
                  allow="encrypted-media;"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                <div className="pointer-events-none absolute left-5 top-5 flex h-10 w-10 items-center justify-center bg-[#8f2633] text-white">
                  <Play size={17} fill="currentColor" />
                </div>

                <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <span className="text-sm font-medium text-white">
                    {video.title}
                  </span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white text-[#171717]">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* PROFILE LINK */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            More videos and updates on our TikTok page.
          </p>

          <a
            href="https://www.tiktok.com/@halal_meathub0"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
          >
            Visit TikTok
            <span className="flex h-9 w-9 items-center justify-center border border-white/20 transition duration-300 group-hover:bg-white group-hover:text-[#171717]">
              <ArrowUpRight
                size={16}
                className="transition duration-300 group-hover:rotate-45"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TikTokShowcase;