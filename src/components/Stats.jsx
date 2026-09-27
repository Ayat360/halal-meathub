import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Stats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-item",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
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
      ref={sectionRef}
      className="border-b border-[#171715] bg-[#0b0b0a] text-white"
    >
      <div className="mx-auto grid max-w-[1600px] divide-y divide-[#171715] px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
        {/* ITEM 1 */}
        <div className="trust-item flex items-center gap-5 py-7 md:px-8 md:py-9 lg:px-10">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c7a875]/30 text-xs font-black text-[#c7a875]">
            01
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.08em]">
              Fresh Selection
            </p>

            <p className="mt-1 text-xs leading-5 text-white/45">
              Meat prepared for the day's sharing.
            </p>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="trust-item flex items-center gap-5 py-7 md:px-8 md:py-9 lg:px-10">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c7a875]/30 text-xs font-black text-[#c7a875]">
            02
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.08em]">
              Know Before You Come
            </p>

            <p className="mt-1 text-xs leading-5 text-white/45">
              Check availability and status online.
            </p>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="trust-item flex items-center gap-5 py-7 md:px-8 md:py-9 lg:px-10">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c7a875]/30 text-xs font-black text-[#c7a875]">
            03
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.08em]">
              Collection & Dispatch
            </p>

            <p className="mt-1 text-xs leading-5 text-white/45">
              Come to the hub or arrange delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;