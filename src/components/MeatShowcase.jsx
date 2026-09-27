import { ArrowUpRight } from "lucide-react";

import goatImage from "../assets/meat/goat.jpg";
import beefImage from "../assets/meat/beef.jpg";
import ramImage from "../assets/meat/ram.jpg";

function MeatShowcase() {
  const meats = [
    {
      name: "Cow",
      image: beefImage,
      description:
        "Fresh beef portions prepared and shared according to the day's availability.",
    },
    {
      name: "Goat",
      image: goatImage,
      description:
        "Fresh goat portions prepared at the Hub for collection or dispatch.",
    },
    {
      name: "Ram",
      image: ramImage,
      description:
        "Ram sharing available on selected days and announced through the Hub.",
    },
  ];

  return (
    <section
      id="meat"
      className="bg-[#171717] px-6 py-20 text-white lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-sm font-semibold text-[#c99a5b]">
              WHAT WE SHARE
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Cow. Goat. Ram.
            </h2>
          </div>

          <p className="max-w-md text-base leading-7 text-white/50">
            The available meat changes with each sharing. Check
            Today's Sharing for the current availability before
            coming to the Hub.
          </p>

        </div>

        {/* MEAT GRID */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {meats.map((meat) => (
            <article
              key={meat.name}
              className="group overflow-hidden bg-[#222220]"
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={meat.image}
                  alt={`${meat.name} meat`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <p className="text-3xl font-bold">
                    {meat.name}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <p className="min-h-[72px] text-sm leading-6 text-white/55">
                  {meat.description}
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <a
                    href="#today"
                    className="flex items-center justify-between text-sm font-semibold"
                  >
                    Check availability

                    <span className="flex h-9 w-9 items-center justify-center border border-white/15 transition group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default MeatShowcase;