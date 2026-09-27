import {
  Check,
  Clock3,
  Truck,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

function TodayAtHub() {
  const meats = [
    {
      name: "Cow",
      price: "₦25,000",
      portions: 8,
      portionSize: "Large share",
      status: "Available",
      collection: true,
      dispatch: true,
    },
    {
      name: "Goat",
      price: "₦20,000",
      portions: 12,
      portionSize: "Large share",
      status: "Sharing now",
      collection: true,
      dispatch: true,
    },
    {
      name: "Ram",
      price: "₦30,000",
      portions: 5,
      portionSize: "Large share",
      status: "Available",
      collection: true,
      dispatch: true,
    },
  ];

  return (
    <section
      id="today"
      className="bg-[#f4f0e8] px-6 py-20 text-[#171717] lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* HEADER */}
        <div className="grid gap-8 border-b border-[#171717]/15 pb-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
  <span className="relative flex h-3 w-3">
    <span className="absolute inline-flex h-full w-full animate-ping bg-[#d7263d] opacity-75" />
    <span className="relative inline-flex h-3 w-3 bg-[#d7263d]" />
  </span>

  <span className="text-sm font-bold uppercase tracking-[0.1em] text-[#d7263d]">
    Live Update
  </span>
</div>

            <h2 className="max-w-[900px] text-5xl font-bold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              Today's
              <br />
              Sharing
            </h2>
          </div>

          <p className="max-w-[430px] text-base leading-7 text-[#666] lg:ml-auto">
            See what meat is available today, current prices,
            portions remaining, and whether collection or dispatch
            is available.
          </p>
        </div>

        {/* LIVE MEAT */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {meats.map((meat) => (
            <article
              key={meat.name}
              className="border border-[#171717]/15 bg-white"
            >
              {/* TOP */}
              <div className="border-b border-[#171717]/10 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 ${
                        meat.status === "Sharing now"
                          ? "bg-[#72c48a]"
                          : "bg-[#c99a5b]"
                      }`}
                    />

                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                      {meat.status}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#999]">
                    TODAY
                  </span>
                </div>

                <h3 className="mt-8 text-5xl font-bold tracking-[-0.05em]">
                  {meat.name}
                </h3>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#888]">
                    Price per portion
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#9b2936]">
                    {meat.price}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-7 sm:p-8">

                <div className="flex items-center justify-between border-b border-[#171717]/10 pb-5">
                  <span className="text-sm text-[#777]">
                    Portions remaining
                  </span>

                  <span className="text-2xl font-bold">
                    {meat.portions}
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

                <a
                  href="https://wa.me/2349031957147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-between bg-[#171717] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#9b2936]"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle size={17} />
                    Ask about {meat.name}
                  </span>

                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* LIVE NOTICE */}
        <div className="mt-5 flex flex-col justify-between gap-5 border border-[#171717]/15 bg-[#e9e4da] p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-start gap-4">
            <Clock3
              size={20}
              className="mt-0.5 shrink-0 text-[#9b2936]"
            />

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                Live update
              </p>

              <p className="mt-2 text-sm font-semibold leading-6 sm:text-base">
                Availability and portions can change while sharing
                is underway. Contact the Hub before travelling.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/2349031957147"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#9b2936]"
          >
            Contact the Hub
            <ArrowUpRight size={17} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default TodayAtHub;