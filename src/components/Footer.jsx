import {
  ArrowUpRight,
  MessageCircle,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#111111] px-6 pb-8 pt-16 text-white lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-[1500px]">
        {/* TOP */}
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_0.6fr_0.7fr]">
          {/* BRAND */}
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-[#c99a5b]">
              HALAL MEATHUB
            </p>

            <h2 className="mt-5 max-w-[700px] text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Fresh sharing.
              <br />
              Straight from the Hub.
            </h2>

            <p className="mt-6 max-w-[500px] text-sm leading-7 text-white/45">
              Check today's sharing, confirm availability, and
              connect with Halal MeatHub for collection or dispatch.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/35">
              Explore
            </p>

            <nav className="mt-6 flex flex-col items-start gap-4">
              <a
                href="#today"
                className="text-sm text-white/65 transition hover:text-white"
              >
                Today's Sharing
              </a>

              <a
                href="#meat"
                className="text-sm text-white/65 transition hover:text-white"
              >
                Our Meat
              </a>

              <a
                href="#hub"
                className="text-sm text-white/65 transition hover:text-white"
              >
                How the Hub Works
              </a>

              <a
                href="#tiktok"
                className="text-sm text-white/65 transition hover:text-white"
              >
                TikTok
              </a>

              <a
                href="#contact"
                className="text-sm text-white/65 transition hover:text-white"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/35">
              Contact
            </p>

            <div className="mt-6 space-y-5">
              <a
                href="https://wa.me/2349031957147"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/65 transition hover:text-white"
              >
                <MessageCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />
                <span>
                  WhatsApp
                  <br />
                  0903 195 7147
                </span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Balogun+Bus+Stop+Potoku+Market+Ikotun+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm leading-6 text-white/65 transition hover:text-white"
              >
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0"
                />
                <span>
                  Balogun Bus Stop
                  <br />
                  Potoku Market, Ikotun
                  <br />
                  Lagos
                </span>
              </a>

              <a
                href="https://www.tiktok.com/@halal_meathub0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#c99a5b]"
              >
                TikTok
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col justify-between gap-5 pt-7 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Halal MeatHub. All rights reserved.
          </p>

          <a
            href="https://portfolio-v1-five-sooty.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 transition hover:text-white"
          >
            Website crafted by{" "}
            <span className="font-bold text-white">
              PROXIMA A3
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;