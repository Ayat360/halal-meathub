import {
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Truck,
} from "lucide-react";

function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#f4f0e8] px-6 py-20 text-[#171717] lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div className="bg-[#9b2936] p-8 text-white sm:p-10 lg:p-14">
            <p className="text-sm font-semibold text-white/60">
              READY TO GET YOUR PORTION?
            </p>

            <h2 className="mt-5 max-w-[650px] text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              Talk directly
              <br />
              to the Hub.
            </h2>

            <p className="mt-7 max-w-[500px] text-base leading-7 text-white/70">
              Check today's availability first, then message us
              to confirm your portion, collection, or dispatch.
            </p>

            <a
              href="https://wa.me/2349031957147"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-3 bg-white px-6 py-4 text-sm font-bold text-[#171717] transition hover:bg-[#171717] hover:text-white"
            >
              <MessageCircle size={18} />
              WhatsApp the Hub
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* RIGHT */}
          <div className="border border-[#171717]/15 bg-white">
            <div className="border-b border-[#171717]/10 p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#777]">
                COLLECTION
              </p>

              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#171717] text-white">
                  <MapPin size={19} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    Visit the Hub
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#666]">
                    Balogun Bus Stop, Shop LAA43,
                    <br />
                    Potoku Market, Ikotun, Lagos.
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Balogun+Bus+Stop+Potoku+Market+Ikotun+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between border-t border-[#171717]/10 pt-5 text-sm font-semibold"
              >
                Get directions
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#777]">
                DISPATCH
              </p>

              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#e9e4da]">
                  <Truck size={19} />
                </div>

                <div>
                  <h3 className="text-xl font-bold">
                    Coming from farther away?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#666]">
                    Ask the Hub about dispatch availability
                    for your location.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/2349031957147"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between border-t border-[#171717]/10 pt-5 text-sm font-semibold text-[#9b2936]"
              >
                Ask about dispatch
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;