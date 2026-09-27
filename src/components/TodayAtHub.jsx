import {
  Check,
  Clock3,
  Truck,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

function TodayAtHub() {
  return (
    <section
      id="today"
      className="bg-[#f4f0e8] px-6 py-20 text-[#171717] lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* SECTION HEADER */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#171717]/15 pb-8 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-sm font-semibold text-[#9b2936]">
              LIVE FROM THE HUB
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Today's Sharing
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#555]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2f8a4c]" />
            Updates from the Hub
          </div>

        </div>

        {/* MAIN INFORMATION */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">

          {/* CURRENT MEAT */}
          <div className="bg-[#171717] p-7 text-white sm:p-9 lg:p-12">

            <div className="flex flex-col justify-between gap-10 md:flex-row">

              <div>
                <p className="text-sm text-white/45">
                  CURRENTLY SHARING
                </p>

                <h3 className="mt-3 text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
                  Goat
                </h3>

                <p className="mt-4 max-w-md text-base leading-7 text-white/55">
                  Fresh portions are being prepared for customers
                  today at the Hub.
                </p>
              </div>

              <div className="md:text-right">
                <p className="text-sm text-white/45">
                  PRICE PER PORTION
                </p>

                <p className="mt-2 text-4xl font-bold text-[#c99a5b]">
                  ₦25,000
                </p>
              </div>

            </div>

            {/* STATUS */}
            <div className="mt-12 grid border border-white/10 sm:grid-cols-3">

              <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-2 text-white/45">
                  <Clock3 size={16} />
                  <span className="text-sm">Status</span>
                </div>

                <p className="mt-3 text-lg font-semibold">
                  Sharing now
                </p>
              </div>

              <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-2 text-white/45">
                  <Check size={16} />
                  <span className="text-sm">Collection</span>
                </div>

                <p className="mt-3 text-lg font-semibold text-[#72c48a]">
                  Available
                </p>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-white/45">
                  <Truck size={16} />
                  <span className="text-sm">Dispatch</span>
                </div>

                <p className="mt-3 text-lg font-semibold text-[#72c48a]">
                  Available
                </p>
              </div>

            </div>

          </div>

          {/* PORTION INFORMATION */}
          <div className="border border-[#171717]/15 bg-white p-7 sm:p-9">

            <p className="text-sm text-[#777]">
              TODAY'S AVAILABILITY
            </p>

            <div className="mt-8">

              <p className="text-6xl font-bold tracking-[-0.05em]">
                12
              </p>

              <p className="mt-2 text-lg font-medium">
                portions remaining
              </p>

            </div>

            <div className="mt-10 border-t border-[#171717]/10 pt-6">

              <p className="text-sm text-[#777]">
                PORTION SIZE
              </p>

              <p className="mt-2 text-lg font-semibold">
                Large share
              </p>

            </div>

            <a
              href="https://wa.me/2349031957147"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-between bg-[#9b2936] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#84232e]"
            >
              Ask about today's meat
              <MessageCircle size={18} />
            </a>

          </div>

        </div>

        {/* ANNOUNCEMENT */}
        <div className="mt-6 flex flex-col justify-between gap-5 border border-[#171717]/15 bg-[#e9e4da] p-6 sm:flex-row sm:items-center sm:p-7">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#777]">
              Hub announcement
            </p>

            <p className="mt-2 text-base font-medium sm:text-lg">
              Today's sharing is currently underway.
            </p>
          </div>

          <a
            href="#hub"
            className="flex items-center gap-2 text-sm font-semibold text-[#9b2936]"
          >
            See the Hub
            <ArrowUpRight size={16} />
          </a>

        </div>

      </div>
    </section>
  );
}

export default TodayAtHub;