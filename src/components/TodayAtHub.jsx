import { useEffect, useRef, useState } from "react";
import {
  Check,
  Truck,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_URL = "http://localhost:5000/api/sharing";

function getStatusStyle(status, available) {
  if (!available) {
    return {
      label: "Not Available",
      dot: "bg-[#777]",
      text: "text-[#777]",
      pulse: false,
    };
  }

  if (status === "Sharing now") {
    return {
      label: "Sharing Now",
      dot: "bg-[#d7263d]",
      text: "text-[#d7263d]",
      pulse: true,
    };
  }

  if (status === "Finished") {
    return {
      label: "Finished",
      dot: "bg-[#666]",
      text: "text-[#666]",
      pulse: false,
    };
  }

  if (status === "Not started") {
    return {
      label: "Not Started",
      dot: "bg-[#c99a5b]",
      text: "text-[#8d6a3e]",
      pulse: false,
    };
  }

  return {
    label: "Available",
    dot: "bg-[#4b8b62]",
    text: "text-[#4b8b62]",
    pulse: false,
  };
}

function TodayAtHub() {
  const [meats, setMeats] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);
  const announcementRef = useRef(null);

  const loadSharing = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load sharing data");
      }

      const data = await response.json();

      setMeats(data.meats || []);
      setAnnouncement(data.announcement || "");
      setError(false);
    } catch (err) {
      console.error("Today's Sharing error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialLoad = setTimeout(loadSharing, 0);

    const interval = setInterval(loadSharing, 30000);

    return () => {
      clearTimeout(initialLoad);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (loading || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(introRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(cardsRef.current?.children || [], {
        y: 55,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(announcementRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: announcementRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, meats]);

  if (loading) {
    return (
      <section
        id="today"
        className="bg-[#f4f0e8] px-5 py-24 text-[#171717] sm:px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping bg-[#d7263d] opacity-60" />
              <span className="relative h-3 w-3 bg-[#d7263d]" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#d7263d]">
              Live Update
            </span>
          </div>

          <p className="mt-6 text-lg font-semibold">
            Loading today's sharing...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="today"
      className="bg-[#f4f0e8] px-5 py-20 text-[#171717] sm:px-6 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* SECTION INTRO */}
        <div className="grid gap-8 border-b border-[#171717]/15 pb-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div ref={headingRef}>
            <div className="mb-5 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping bg-[#d7263d] opacity-60" />
                <span className="relative h-3 w-3 bg-[#d7263d]" />
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#d7263d]">
                Live Update
              </span>
            </div>

            <h2 className="text-[clamp(3.2rem,7vw,7rem)] font-bold leading-[0.88] tracking-[-0.06em]">
              Today's
              <br />
              <span className="text-[#171717]/35">
                Sharing
              </span>
            </h2>
          </div>

          <div ref={introRef} className="lg:ml-auto lg:max-w-[430px]">
            <p className="text-base leading-7 text-[#666] sm:text-lg sm:leading-8">
              See what's being shared at the Hub right now,
              including prices, portions and whether collection
              or dispatch is available.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#888]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d7263d] opacity-50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#d7263d]" />
              </span>

              Automatically updated
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 border border-[#d7263d]/20 bg-[#d7263d]/5 p-5">
            <p className="font-bold text-[#d7263d]">
              Live update temporarily unavailable.
            </p>

            <p className="mt-1 text-sm leading-6 text-[#666]">
              Please check again shortly or contact the Hub.
            </p>
          </div>
        )}

        {/* MEAT CARDS */}
        <div
          ref={cardsRef}
          className="mt-10 grid gap-5 lg:grid-cols-3"
        >
          {meats.map((meat) => {
            const status = getStatusStyle(
              meat.status,
              meat.available
            );

            return (
              <article
                key={meat.name}
                className="group border border-[#171717]/15 bg-white transition-transform duration-500 hover:-translate-y-1"
              >
                {/* CARD TOP */}
                <div className="border-b border-[#171717]/10 p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] ${status.text}`}
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        {status.pulse && (
                          <span
                            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${status.dot} opacity-60`}
                          />
                        )}

                        <span
                          className={`relative h-2.5 w-2.5 rounded-full ${status.dot}`}
                        />
                      </span>

                      {status.label}
                    </div>

                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#aaa]">
                      TODAY
                    </span>
                  </div>

                  <h3 className="mt-8 text-[clamp(2.8rem,5vw,4.2rem)] font-bold tracking-[-0.06em]">
                    {meat.name}
                  </h3>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#888]">
                      Price per portion
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#9b2936]">
                      ₦
                      {Number(meat.price).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* CARD DETAILS */}
                <div className="p-7 sm:p-8">
                  <div className="flex items-center justify-between border-b border-[#171717]/10 pb-5">
                    <span className="text-sm text-[#777]">
                      Portions remaining
                    </span>

                    <span className="text-2xl font-bold">
                      {meat.available ? meat.portions : "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#171717]/10 py-5">
                    <span className="text-sm text-[#777]">
                      Portion size
                    </span>

                    <span className="text-sm font-bold">
                      {meat.portionSize}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#171717]/10 py-5">
                    <span className="flex items-center gap-2 text-sm text-[#777]">
                      <Check size={16} />
                      Collection
                    </span>

                    <span
                      className={
                        meat.collection
                          ? "text-sm font-bold text-[#43875b]"
                          : "text-sm font-bold text-[#999]"
                      }
                    >
                      {meat.collection
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-5">
                    <span className="flex items-center gap-2 text-sm text-[#777]">
                      <Truck size={16} />
                      Dispatch
                    </span>

                    <span
                      className={
                        meat.dispatch
                          ? "text-sm font-bold text-[#43875b]"
                          : "text-sm font-bold text-[#999]"
                      }
                    >
                      {meat.dispatch
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>

                  {/* WHATSAPP ACTION */}
                  {meat.available &&
                  meat.status !== "Finished" ? (
                    <a
                      href="https://wa.me/2349031957147"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center justify-between bg-[#171717] px-5 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#9b2936]"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle size={17} />
                        Ask about {meat.name}
                      </span>

                      <ArrowUpRight size={17} />
                    </a>
                  ) : (
                    <div className="mt-2 bg-[#e9e4da] px-5 py-4 text-center text-sm font-bold text-[#777]">
                      {meat.status === "Finished"
                        ? "Sharing finished"
                        : "Not available today"}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* ANNOUNCEMENT */}
        <div
          ref={announcementRef}
          className="mt-5 border border-[#171717]/15 bg-[#e9e4da] p-6 sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#777]">
                Hub announcement
              </p>
            </div>

            <p className="text-sm font-semibold leading-6 sm:text-base">
              {announcement ||
                "No announcement for today."}
            </p>
          </div>
        </div>

        {/* LOCATION NOTE */}
        <div className="mt-7 flex flex-col justify-between gap-3 border-t border-[#171717]/10 pt-5 text-xs font-bold uppercase tracking-[0.08em] text-[#999] sm:flex-row">
          <span>
            Balogun Bus Stop · Potoku Market · Ikotun
          </span>

          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </section>
  );
}

export default TodayAtHub;