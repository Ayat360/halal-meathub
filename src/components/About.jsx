import {
  ArrowDownRight,
  MessageCircle,
  MapPin,
  Truck,
} from "lucide-react";

function About() {
  const steps = [
    {
      number: "01",
      title: "Check today's sharing",
      text: "See what is being shared, the current price, portions remaining, and whether sharing is still underway.",
      icon: ArrowDownRight,
    },
    {
      number: "02",
      title: "Talk to the Hub",
      text: "Need a portion or want to confirm availability? Message Halal MeatHub directly on WhatsApp.",
      icon: MessageCircle,
    },
    {
      number: "03",
      title: "Collect or dispatch",
      text: "Come to the Hub in Ikotun for collection, or arrange dispatch if you're ordering from farther away.",
      icon: Truck,
    },
  ];

  return (
    <section
      id="hub"
      className="bg-[#f4f0e8] px-6 py-20 text-[#171717] lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <div className="grid gap-8 border-b border-[#171717]/15 pb-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold text-[#9b2936]">
              HOW THE HUB WORKS
            </p>

            <h2 className="max-w-[850px] text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              From today's
              <br />
              sharing to your table.
            </h2>
          </div>

          <p className="max-w-[430px] text-base leading-7 text-[#555] lg:ml-auto">
            Halal MeatHub keeps the process simple. Check what is
            happening today, confirm what you need, then collect
            from the Hub or arrange dispatch.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-10 border-t border-[#171717]/15">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group grid gap-6 border-b border-[#171717]/15 py-8 md:grid-cols-[100px_1fr_1.2fr_60px] md:items-center lg:py-10"
              >
                <span className="text-sm font-semibold text-[#9b2936]">
                  {step.number}
                </span>

                <h3 className="text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
                  {step.title}
                </h3>

                <p className="max-w-[520px] text-base leading-7 text-[#666]">
                  {step.text}
                </p>

                <div className="flex h-11 w-11 items-center justify-center border border-[#171717]/15 transition duration-300 group-hover:bg-[#171717] group-hover:text-white">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
              </div>
            );
          })}
        </div>

        {/* LOCATION STRIP */}
        <div className="mt-10 grid gap-0 bg-[#171717] text-white md:grid-cols-[1fr_auto]">
          <div className="p-7 sm:p-9 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center bg-[#9b2936]">
                <MapPin size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/40">
                  THE HUB
                </p>

                <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                  Balogun Bus Stop · Potoku Market
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  Shop LAA43, Igando Road, Ikotun, Lagos.
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Balogun+Bus+Stop+Potoku+Market+Ikotun+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-6 border-t border-white/10 px-7 py-6 text-sm font-semibold transition hover:bg-white hover:text-black md:border-l md:border-t-0 md:px-9"
          >
            Get directions
            <ArrowDownRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;