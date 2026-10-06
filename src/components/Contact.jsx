import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content", {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".contact-actions", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
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
      className="bg-[#8f2633] px-5 py-24 text-[#f4f0e8] sm:px-8 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-24">
          {/* LEFT */}
          <div className="contact-content">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              <span className="h-2 w-2 bg-white" />
              Contact the Hub
            </div>

            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              Ready for
              <br />
              your share?
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Check today's sharing first, then contact the Hub to confirm
              availability, collection or dispatch before making your trip.
            </p>
          </div>

          {/* RIGHT */}
          <div className="contact-actions">
            <div className="border-t border-white/20">
              <a
                href="https://wa.me/2349031957147"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/20 py-6"
              >
                <div className="flex items-center gap-4">
                  <MessageCircle size={22} strokeWidth={1.8} />

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                      WhatsApp
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      0903 195 7147
                    </p>
                  </div>
                </div>

                <span className="flex h-10 w-10 items-center justify-center border border-white/25 transition duration-300 group-hover:bg-white group-hover:text-[#8f2633]">
                  <ArrowUpRight
                    size={17}
                    className="transition duration-300 group-hover:rotate-45"
                  />
                </span>
              </a>

              <a
                href="tel:+2349031957147"
                className="group flex items-center justify-between border-b border-white/20 py-6"
              >
                <div className="flex items-center gap-4">
                  <Phone size={21} strokeWidth={1.8} />

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                      Call
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      0903 195 7147
                    </p>
                  </div>
                </div>

                <span className="flex h-10 w-10 items-center justify-center border border-white/25 transition duration-300 group-hover:bg-white group-hover:text-[#8f2633]">
                  <ArrowUpRight
                    size={17}
                    className="transition duration-300 group-hover:rotate-45"
                  />
                </span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Potoku%20Market%20Ikotun%20Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6"
              >
                <div className="flex items-center gap-4">
                  <MapPin size={21} strokeWidth={1.8} />

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                      Find the Hub
                    </p>

                    <p className="mt-1 max-w-[230px] text-lg font-semibold leading-7">
                      Potoku Market, Ikotun, Lagos
                    </p>
                  </div>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 transition duration-300 group-hover:bg-white group-hover:text-[#8f2633]">
                  <ArrowUpRight
                    size={17}
                    className="transition duration-300 group-hover:rotate-45"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;