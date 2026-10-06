import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#171717] px-5 pb-8 pt-20 text-[#f4f0e8] sm:px-8 lg:px-10 lg:pt-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:gap-20">
          {/* BRAND */}
          <div className="footer-reveal">
            <a
              href="#top"
              className="inline-block text-2xl font-bold tracking-[-0.04em]"
            >
              HALAL <span className="text-[#c98b58]">MEATHUB</span>
            </a>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/45 sm:text-base">
              Fresh meat sharing in Lagos. Check what is available today,
              confirm with the Hub, then collect or arrange dispatch when
              available.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="footer-reveal">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Explore
            </p>

            <nav className="flex flex-col gap-4 text-sm text-white/65">
              <a
                href="#today"
                className="transition-colors hover:text-white"
              >
                Today's Sharing
              </a>

              <a
                href="#meat"
                className="transition-colors hover:text-white"
              >
                Our Meat
              </a>

              <a
                href="#hub"
                className="transition-colors hover:text-white"
              >
                The Hub
              </a>

              <a
                href="#tiktok"
                className="transition-colors hover:text-white"
              >
                TikTok
              </a>

              <a
                href="#contact"
                className="transition-colors hover:text-white"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* CONTACT */}
          <div className="footer-reveal">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              The Hub
            </p>

            <div className="flex flex-col gap-5 text-sm text-white/60">
              <a
                href="https://wa.me/2349031957147"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-colors hover:text-white"
              >
                <MessageCircle size={17} strokeWidth={1.8} />
                WhatsApp
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Potoku%20Market%20Ikotun%20Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <MapPin
                  size={17}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  Shop LAA43
                  <br />
                  Potoku Market, Ikotun
                  <br />
                  Lagos
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-5 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Halal MeatHub. All rights reserved.</p>

          <p>
            Website crafted by{" "}
            <a
              href="https://portfolio-v1-five-sooty.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white transition-colors hover:text-[#c98b58]"
            >
              PROXIMA A3
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;