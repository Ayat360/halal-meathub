import { useState } from "react";

const meatOptions = ["Cow", "Goat", "Ram"];

const sharingOptions = [
  "Not Started",
  "Sharing Now",
  "Almost Finished",
  "Finished",
];

function AdminDashboard() {
  const [animal, setAnimal] = useState("Cow");
  const [price, setPrice] = useState("");
  const [portions, setPortions] = useState("");
  const [portionSize, setPortionSize] = useState("");
  const [sharingStatus, setSharingStatus] = useState("Not Started");
  const [collection, setCollection] = useState(true);
  const [dispatch, setDispatch] = useState(true);
  const [announcement, setAnnouncement] = useState("");

  const handlePublish = (e) => {
    e.preventDefault();

    console.log({
      animal,
      price,
      portions,
      portionSize,
      sharingStatus,
      collection,
      dispatch,
      announcement,
    });

    alert("Today's meat update is ready to publish.");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0a] text-white">
      {/* TOP BAR */}
      <header className="border-b border-white/10 bg-[#0f0f0d]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c7a875]">
              Halal MeatHub
            </p>

            <h1 className="mt-1 text-xl font-black uppercase tracking-[-0.03em]">
              Admin Dashboard
            </h1>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs font-bold text-white/70">
              Business Management
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
              Live Control Panel
            </p>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        {/* WELCOME */}
        <section className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
            Today's Operations
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-5xl md:text-7xl">
            Manage what customers see.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Update today's meat availability, sharing status, collection,
            dispatch and announcements. Published information will appear on
            the public Halal MeatHub website.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* UPDATE FORM */}
          <form
            onSubmit={handlePublish}
            className="rounded-2xl border border-white/10 bg-[#11110f] p-5 sm:p-7 md:p-8"
          >
            <div className="mb-8 border-b border-white/10 pb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c7a875]">
                Today's Meat
              </p>

              <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">
                Create today's update
              </h3>
            </div>

            <div className="space-y-7">
              {/* ANIMAL */}
              <div>
                <label className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/60">
                  Animal Available
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {meatOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnimal(option)}
                      className={`rounded-xl border px-4 py-4 text-sm font-black uppercase transition-all duration-300 ${
                        animal === option
                          ? "border-[#c7a875] bg-[#c7a875] text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/60"
                >
                  Price
                </label>

                <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] focus-within:border-[#c7a875]">
                  <span className="pl-4 text-sm font-bold text-white/40">
                    ₦
                  </span>

                  <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    className="w-full bg-transparent px-3 py-4 text-sm font-bold text-white outline-none placeholder:text-white/25"
                  />
                </div>
              </div>

              {/* PORTIONS */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="portions"
                    className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/60"
                  >
                    Number of Portions
                  </label>

                  <input
                    id="portions"
                    type="number"
                    value={portions}
                    onChange={(e) => setPortions(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#c7a875]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="portionSize"
                    className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/60"
                  >
                    Portion Size
                  </label>

                  <input
                    id="portionSize"
                    type="text"
                    value={portionSize}
                    onChange={(e) => setPortionSize(e.target.value)}
                    placeholder="e.g. Small / Medium"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#c7a875]"
                  />
                </div>
              </div>

              {/* SHARING STATUS */}
              <div>
                <label
                  htmlFor="sharingStatus"
                  className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/60"
                >
                  Sharing Status
                </label>

                <select
                  id="sharingStatus"
                  value={sharingStatus}
                  onChange={(e) => setSharingStatus(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold text-white outline-none transition-colors focus:border-[#c7a875]"
                >
                  {sharingOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#11110f]"
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* COLLECTION + DISPATCH */}
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setCollection(!collection)}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-white/20"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.15em]">
                      Collection
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      Customers can collect
                    </p>
                  </div>

                  <span
                    className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                      collection ? "bg-[#c7a875]" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-black transition-transform ${
                        collection ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDispatch(!dispatch)}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-white/20"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.15em]">
                      Dispatch
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      Dispatch available
                    </p>
                  </div>

                  <span
                    className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                      dispatch ? "bg-[#c7a875]" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-black transition-transform ${
                        dispatch ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </span>
                </button>
              </div>

              {/* ANNOUNCEMENT */}
              <div>
                <label
                  htmlFor="announcement"
                  className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/60"
                >
                  Special Announcement
                </label>

                <textarea
                  id="announcement"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  rows="5"
                  placeholder="Write something customers should know today..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold leading-6 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#c7a875]"
                />
              </div>

              {/* PUBLISH */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#c7a875] px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#d6ba8a]"
              >
                Publish Today's Update
              </button>
            </div>
          </form>

          {/* LIVE PREVIEW */}
          <aside className="h-fit rounded-2xl border border-white/10 bg-[#11110f] p-6 lg:sticky lg:top-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c7a875]">
                  Customer View
                </p>

                <h3 className="mt-2 text-xl font-black uppercase tracking-[-0.04em]">
                  Live Preview
                </h3>
              </div>

              <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Preview
              </span>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Today at the Hub
              </p>

              <h4 className="mt-2 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em]">
                {animal} Meat
              </h4>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/50">
                      Price
                    </span>

                    <span className="font-black">
                      {price ? `₦${price}` : "Not set"}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/50">
                      Portions
                    </span>

                    <span className="font-black">
                      {portions || "Not set"}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-white/50">
                      Sharing
                    </span>

                    <span className="text-right text-xs font-black uppercase text-[#c7a875]">
                      {sharingStatus}
                    </span>
                  </div>
                </div>
              </div>

              {announcement && (
                <div className="mt-4 rounded-xl border border-[#c7a875]/30 bg-[#c7a875]/5 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#c7a875]">
                    Announcement
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {announcement}
                  </p>
                </div>
              )}

              <div className="mt-5 flex gap-2">
                {collection && (
                  <span className="rounded-full bg-white/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em] text-white/60">
                    Collection
                  </span>
                )}

                {dispatch && (
                  <span className="rounded-full bg-white/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em] text-white/60">
                    Dispatch
                  </span>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;