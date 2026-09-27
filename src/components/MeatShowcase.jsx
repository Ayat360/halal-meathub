import { ArrowUpRight } from "lucide-react";

import goatImage from "../assets/meat/goat.jpg";
import beefImage from "../assets/meat/beef.jpg";
import ramImage from "../assets/meat/ram.jpg";

function MeatShowcase() {
  const meats = [
    {
      name: "Cow",
      image: beefImage,
      text: "Fresh beef shared into portions according to the current Hub sharing.",
    },
    {
      name: "Goat",
      image: goatImage,
      text: "Fresh goat portions prepared and shared at the Hub on available days.",
    },
    {
      name: "Ram",
      image: ramImage,
      text: "Ram sharing is announced when available through the Hub.",
    },
  ];

  return (
    <section
      id="meat"
      className="bg-[#171717] px-6 py-20 text-white lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* HEADER */}
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#c99a5b]">
              What we share
            </p>

            <h2 className="max-w-[850px] text-5xl font-bold leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
              Choose your
              <br />
              kind of meat.
            </h2>
          </div>

          <p className="max-w-[420px] text-base leading-7 text-white/50 lg:ml-auto">
            Cow, goat and ram are shared in portions depending on
            what is being prepared at the Hub. Check Today's Sharing
            for what is currently available.
          </p>
        </div>

        {/* MEAT LIST */}
        <div className="mt-10 border-t border-white/10">
          {meats.map((meat, index) => (
            <article
              key={meat.name}
              className="group grid border-b border-white/10 py-6 md:grid-cols-[90px_1fr_1fr_auto] md:items-center md:gap-8 lg:py-8"
            >
              {/* NUMBER */}
              <span className="mb-5 text-sm font-bold text-[#c99a5b] md:mb-0">
                0{index + 1}
              </span>

              {/* IMAGE */}
              <div className="relative mb-6 h-[260px] overflow-hidden md:mb-0 md:h-[220px]">
                <img
                  src={meat.image}
                  alt={`${meat.name} meat`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-black/0" />
              </div>

              {/* CONTENT */}
              <div className="md:pr-8">
                <h3 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                  {meat.name}
                </h3>

                <p className="mt-4 max-w-[430px] text-sm leading-7 text-white/45 sm:text-base">
                  {meat.text}
                </p>
              </div>

              {/* LINK */}
              <a
                href="#today"
                className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-bold md:mt-0 md:block md:border-0 md:pt-0"
              >
                <span>Check availability</span>

                <span className="ml-4 inline-flex h-10 w-10 items-center justify-center border border-white/15 transition duration-300 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            </article>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-8 flex flex-col justify-between gap-5 border border-white/10 bg-[#202020] p-6 sm:flex-row sm:items-center sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/35">
              Important
            </p>

            <p className="mt-2 max-w-[700px] text-sm leading-6 text-white/55">
              Availability, prices and portion sizes can change with
              each sharing. Always check the live update before coming
              to the Hub.
            </p>
          </div>

          <a
            href="#today"
            className="flex shrink-0 items-center gap-2 text-sm font-bold text-[#c99a5b]"
          >
            See today's sharing
            <ArrowUpRight size={17} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default MeatShowcase;