import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
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
      id="contact"
      className="relative overflow-hidden bg-[#11110f] px-6 py-32 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="contact-reveal mb-20">
          <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-[#c7a875]">
            Find The Hub
          </p>

          <h2 className="max-w-6xl text-[clamp(4rem,11vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.08em]">
            Come
            <br />
            <span className="text-white/30">Through.</span>
          </h2>
        </div>

        <div className="grid border-t border-white/10 md:grid-cols-3">
          <div className="contact-reveal border-b border-white/10 py-8 md:border-b-0 md:border-r md:pr-10">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
              Location
            </p>

            <p className="mt-5 text-lg text-white/75">
              Lagos, Nigeria
            </p>
          </div>

          <div className="contact-reveal border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-10">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
              TikTok
            </p>

            <a
              href="https://www.tiktok.com/@halal_meathub0"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block text-lg transition hover:text-[#c7a875]"
            >
              @halal_meathub0
            </a>
          </div>

          <div className="contact-reveal py-8 md:pl-10">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
              Connect
            </p>

            <a
              href="https://www.tiktok.com/@halal_meathub0"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-4 border border-white/20 px-6 py-4 text-[10px] uppercase tracking-[0.25em] transition duration-500 hover:bg-white hover:text-black"
            >
              Visit TikTok
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;