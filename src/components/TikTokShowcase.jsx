import { ArrowUpRight } from "lucide-react";

function TikTokShowcase() {
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

  return (
    <section
      id="tiktok"
      className="bg-[#171717] px-6 py-20 text-white lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold text-[#c99a5b]">
              FOLLOW THE HUB
            </p>

            <h2 className="max-w-[800px] text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              See the sharing
              <br />
              in real life.
            </h2>
          </div>

          <div className="lg:ml-auto lg:max-w-[420px]">
            <p className="text-base leading-7 text-white/50">
              Our TikTok is where the latest meat-sharing activity
              happens. Watch what is happening at the Hub and stay
              connected with the next sharing.
            </p>

            <a
              href="https://www.tiktok.com/@halal_meathub0"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 border border-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
            >
              Visit our TikTok
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* VIDEOS */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {videos.map((video, index) => (
            <article
              key={video.id}
              className="overflow-hidden bg-[#222220]"
            >
              <div className="relative aspect-[9/16] bg-black">
                <iframe
                  src={`https://www.tiktok.com/player/v1/${video.id}?autoplay=0&loop=1&description=1&music_info=1&controls=1`}
                  className="absolute inset-0 h-full w-full"
                  title={`Halal MeatHub TikTok video ${index + 1}`}
                  allow="fullscreen"
                  scrolling="no"
                  frameBorder="0"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-5 py-5">
                <div>
                  <p className="text-sm font-semibold">
                    {video.title}
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    @halal_meathub0
                  </p>
                </div>

                <span className="text-xs font-semibold text-[#c99a5b]">
                  TikTok
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TikTokShowcase;