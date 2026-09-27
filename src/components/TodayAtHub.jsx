import {
  Check,
  Clock3,
  Truck,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

function TodayAtHub() {
  // These values will later come from the admin dashboard/database.
  const sharing = {
    animal: "Goat",
    price: "₦25,000",
    portions: 12,
    portionSize: "Large share",

    status: "Sharing now",
    statusText:
      "Fresh portions are currently being prepared and shared at the Hub.",

    collection: true,
    dispatch: true,

    announcement:
      "Today's sharing is currently underway. Contact the Hub before travelling to confirm availability.",
  };

  return (
    <section
      id="today"
      className="bg-[#f4f0e8] px-6 py-20 text-[#171717] lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* HEADER */}
        <div className="grid gap-8 border-b border-[#171717]/15 pb-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#9b2936]">
              Live at the Hub
            </p>

            <h2 className="max-w-[900px] text-5xl font-bold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              Today's
              <br />
              Sharing
            </h2>
          </div>

          <p className="max-w-[430px] text-base leading-7 text-[#666] lg:ml-auto">
            Check what is being shared today, how much a portion
            costs, how many portions remain, and whether collection
            or dispatch is available.
          </p>
        </div>

        {/* MAIN LIVE PANEL */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">

          {/* CURRENT SHARING */}
          <div className="bg-[#171717] p-7 text-white sm:p-10 lg:p-12">

            <div className="flex flex-col justify-between gap-10 md:flex-row">

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 bg-[#72c48a]" />

                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/45">
                    {sharing.status}
                  </span>
                </div>

                <h3 className="mt-6 text-6xl font-bold tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                  {sharing.animal}
                </h3>

                <p className="mt-5 max-w-[500px] text-base leading-7 text-white/50">
                  {sharing.statusText}
                </p>
              </div>

              {/* PRICE */}
              <div className="md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/40">
                  Price per portion
                </p>

                <p className="mt-2 text-4xl font-bold text-[#c99a5b] sm:text-5xl">
                  {sharing.price}
                </p>

                <p className="mt-2 text-sm text-white/40">
                  {sharing.portionSize}
                </p>
              </div>

            </div>

            {/* LIVE STATUS */}
            <div className="mt-12 grid border border-white/10 sm:grid-cols-3">

              {/* SHARING */}
              <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-2 text-white/40">
                  <Clock3 size={17} />

                  <span className="text-xs font-semibold uppercase tracking-[0.06em]">
                    Sharing
                  </span>
                </div>

                <p className="mt-4 text-lg font-semibold">
                  {sharing.status}
                </p>
              </div>

              {/* COLLECTION */}
              <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
                <div className="flex items-center gap-2 text-white/40">
                  <Check size={17} />

                  <span className="text-xs font-semibold uppercase tracking-[0.06em]">
                    Collection
                  </span>
                </div>

                <p
                  className={`mt-4 text-lg font-semibold ${
                    sharing.collection
                      ? "text-[#72c48a]"
                      : "text-white/40"
                  }`}
                >
                  {sharing.collection
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>

              {/* DISPATCH */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-white/40">
                  <Truck size={17} />

                  <span className="text-xs font-semibold uppercase tracking-[0.06em]">
                    Dispatch
                  </span>
                </div>

                <p
                  className={`mt-4 text-lg font-semibold ${
                    sharing.dispatch
                      ? "text-[#72c48a]"
                      : "text-white/40"
                  }`}
                >
                  {sharing.dispatch
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>

            </div>
          </div>

          {/* PORTIONS */}
          <div className="flex flex-col justify-between border border-[#171717]/15 bg-white p-7 sm:p-9">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                Portions remaining
              </p>

              <p className="mt-7 text-7xl font-bold tracking-[-0.06em]">
                {sharing.portions}
              </p>

              <p className="mt-2 text-lg font-semibold">
                portions available
              </p>
            </div>

            <div className="mt-10 border-t border-[#171717]/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                Portion size
              </p>

              <p className="mt-3 text-xl font-bold">
                {sharing.portionSize}
              </p>
            </div>

            <a
              href="https://wa.me/2349031957147"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-between bg-[#9b2936] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#84232e]"
            >
              <span className="flex items-center gap-2">
                <MessageCircle size={18} />
                Ask about today's sharing
              </span>

              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* ANNOUNCEMENT */}
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto]">

          <div className="border border-[#171717]/15 bg-[#e9e4da] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
              Hub announcement
            </p>

            <p className="mt-3 max-w-[800px] text-base font-semibold leading-7 sm:text-lg">
              {sharing.announcement}
            </p>
          </div>

          <a
            href="https://wa.me/2349031957147"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#171717] px-7 py-6 text-sm font-bold text-white transition hover:bg-[#9b2936] md:min-w-[230px]"
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