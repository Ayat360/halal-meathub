import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Truck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hub-label", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".hub-heading", {
        y: 55,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".hub-copy", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".hub-location", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".hub-step", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hub-steps",
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hub"
      className="bg-[#f4f0e8] px-5 py-24 text-[#171717] sm:px-8 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* INTRO */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <div className="hub-label mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8f2633]">
              <span className="h-2 w-2 rounded-full bg-[#8f2633]" />
              The Hub
            </div>

            <h2 className="hub-heading max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              From today's sharing
              <br />
              to your doorstep.
            </h2>
          </div>

          <div className="lg:flex lg:items-end">
            <p className="hub-copy max-w-xl text-base leading-8 text-black/65 sm:text-lg">
              Once you see what is available, getting your share is simple.
              Collect directly from our hub in Ikotun, or contact us to arrange
              dispatch when available.
            </p>
          </div>
        </div>

        {/* LOCATION */}
        <div className="hub-location mt-16 border-y border-black/10 py-10 sm:mt-20 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#171717] text-[#f4f0e8]">
                <MapPin size={21} strokeWidth={1.8} />
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                  Collection point
                </p>

                <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  Balogun Bus Stop · Potoku Market
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-7 text-black/55 sm:text-base">
                  Shop LAA43, Potoku Market, Igando Road, Ikotun, Lagos.
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Potoku%20Market%20Ikotun%20Lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#8f2633]"
            >
              Open location
              <span className="flex h-9 w-9 items-center justify-center border border-[#8f2633]/30 transition duration-300 group-hover:bg-[#8f2633] group-hover:text-white">
                <ArrowUpRight
                  size={16}
                  className="transition duration-300 group-hover:rotate-45"
                />
              </span>
            </a>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="hub-steps mt-16 grid border-l border-black/10 sm:grid-cols-3 sm:border-l-0">
          <div className="hub-step border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center bg-[#8f2633] text-sm font-semibold text-white">
                1
              </span>
              <h3 className="text-lg font-semibold">Check today</h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/55">
              See what animal is available, the current share price, portion
              information and whether sharing has started or finished.
            </p>
          </div>

          <div className="hub-step border-b border-black/10 py-8 sm:border-b-0 sm:border-r sm:px-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center bg-[#171717] text-sm font-semibold text-white">
                2
              </span>
              <h3 className="text-lg font-semibold">Contact the Hub</h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/55">
              Message us on WhatsApp to confirm your share and get the latest
              collection or dispatch information.
            </p>
          </div>

          <div className="hub-step py-8 sm:px-8 sm:pr-0">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center bg-[#8f2633] text-sm font-semibold text-white">
                3
              </span>
              <h3 className="text-lg font-semibold">Collect or dispatch</h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/55">
              Pick up your share at the Hub, or arrange dispatch when that
              option is available for the day's sharing.
            </p>
          </div>
        </div>

        {/* CONTACT STRIP */}
        <div className="mt-16 bg-[#171717] px-6 py-8 text-[#f4f0e8] sm:px-10 sm:py-10 lg:mt-20 lg:px-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c98b58]">
                <Truck size={15} />
                Collection & dispatch
              </div>

              <h3 className="max-w-2xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Need to confirm before you make the trip?
              </h3>
            </div>

            <a
              href="https://wa.me/2349031957147"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-4 bg-[#8f2633] px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:bg-[#74202a]"
            >
              <MessageCircle size={19} strokeWidth={1.8} />
              WhatsApp the Hub
              <ArrowUpRight
                size={17}
                className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;