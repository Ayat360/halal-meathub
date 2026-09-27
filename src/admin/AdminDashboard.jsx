import { useState } from "react";
import {
  Save,
  Beef,
  CircleCheck,
  Truck,
  Megaphone,
} from "lucide-react";

function AdminDashboard() {
  const [meats, setMeats] = useState([
    {
      name: "Cow",
      available: true,
      price: "25000",
      portions: "8",
      portionSize: "Large share",
      status: "Available",
      collection: true,
      dispatch: true,
    },
    {
      name: "Goat",
      available: true,
      price: "20000",
      portions: "12",
      portionSize: "Large share",
      status: "Sharing now",
      collection: true,
      dispatch: true,
    },
    {
      name: "Ram",
      available: true,
      price: "30000",
      portions: "5",
      portionSize: "Large share",
      status: "Available",
      collection: true,
      dispatch: true,
    },
  ]);

  const [announcement, setAnnouncement] = useState(
    "Today's sharing is currently underway. Contact the Hub before travelling to confirm availability."
  );

  const updateMeat = (index, field, value) => {
    setMeats((current) =>
      current.map((meat, i) =>
        i === index
          ? {
              ...meat,
              [field]: value,
            }
          : meat
      )
    );
  };

  const handleSave = () => {
    console.log("Today's Sharing:", {
      meats,
      announcement,
    });

    alert("Today's Sharing updated.");
  };

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#171717]">
      {/* HEADER */}
      <header className="border-b border-[#171717]/10 bg-[#171717] px-6 py-6 text-white lg:px-12">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c99a5b]">
              Halal MeatHub
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Today's Sharing
            </h1>
          </div>

          <a
            href="/"
            className="border border-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
          >
            View website
          </a>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-12 lg:py-14">

        {/* INTRO */}
        <div className="max-w-[750px]">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#9b2936]">
            Live information
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Update what customers see today.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#666]">
            Change the meat, price, available portions, sharing status,
            collection, dispatch and announcement from here.
          </p>
        </div>

        {/* MEAT CONTROLS */}
        <div className="mt-10 space-y-5">
          {meats.map((meat, index) => (
            <section
              key={meat.name}
              className="border border-[#171717]/10 bg-white"
            >
              {/* MEAT HEADER */}
              <div className="flex flex-col justify-between gap-5 border-b border-[#171717]/10 p-6 sm:flex-row sm:items-center sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#171717] text-white">
                    <Beef size={21} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      {meat.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#777]">
                      Customer availability
                    </p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={meat.available}
                    onChange={(e) =>
                      updateMeat(
                        index,
                        "available",
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 accent-[#9b2936]"
                  />

                  Available today
                </label>
              </div>

              {/* FIELDS */}
              <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2 lg:grid-cols-4">

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                    Price
                  </span>

                  <div className="mt-2 flex border border-[#171717]/15 bg-[#f8f6f1]">
                    <span className="flex items-center px-3 text-sm font-bold">
                      ₦
                    </span>

                    <input
                      type="number"
                      value={meat.price}
                      onChange={(e) =>
                        updateMeat(
                          index,
                          "price",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent px-3 py-3 outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                    Portions remaining
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={meat.portions}
                    onChange={(e) =>
                      updateMeat(
                        index,
                        "portions",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full border border-[#171717]/15 bg-[#f8f6f1] px-4 py-3 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                    Portion size
                  </span>

                  <input
                    type="text"
                    value={meat.portionSize}
                    onChange={(e) =>
                      updateMeat(
                        index,
                        "portionSize",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full border border-[#171717]/15 bg-[#f8f6f1] px-4 py-3 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                    Sharing status
                  </span>

                  <select
                    value={meat.status}
                    onChange={(e) =>
                      updateMeat(
                        index,
                        "status",
                        e.target.value
                      )
                    }
                    className="mt-2 w-full border border-[#171717]/15 bg-[#f8f6f1] px-4 py-3 outline-none"
                  >
                    <option>Not started</option>
                    <option>Sharing now</option>
                    <option>Finished</option>
                    <option>Available</option>
                  </select>
                </label>
              </div>

              {/* AVAILABILITY OPTIONS */}
              <div className="grid border-t border-[#171717]/10 sm:grid-cols-2">

                <label className="flex cursor-pointer items-center justify-between border-b border-[#171717]/10 p-6 sm:border-b-0 sm:border-r sm:p-8">
                  <div className="flex items-center gap-3">
                    <CircleCheck size={20} />

                    <div>
                      <p className="font-bold">
                        Collection
                      </p>

                      <p className="mt-1 text-sm text-[#777]">
                        Customers can collect at the Hub
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={meat.collection}
                    onChange={(e) =>
                      updateMeat(
                        index,
                        "collection",
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 accent-[#9b2936]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <Truck size={20} />

                    <div>
                      <p className="font-bold">
                        Dispatch
                      </p>

                      <p className="mt-1 text-sm text-[#777]">
                        Dispatch can be arranged
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={meat.dispatch}
                    onChange={(e) =>
                      updateMeat(
                        index,
                        "dispatch",
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 accent-[#9b2936]"
                  />
                </label>

              </div>
            </section>
          ))}
        </div>

        {/* ANNOUNCEMENT */}
        <section className="mt-6 border border-[#171717]/10 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-[#9b2936] text-white">
              <Megaphone size={19} />
            </div>

            <div>
              <h3 className="text-xl font-bold">
                Hub announcement
              </h3>

              <p className="mt-1 text-sm text-[#777]">
                This message appears in Today's Sharing.
              </p>
            </div>
          </div>

          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            rows={4}
            className="mt-6 w-full resize-none border border-[#171717]/15 bg-[#f8f6f1] px-4 py-4 outline-none"
            placeholder="Write today's announcement..."
          />
        </section>

        {/* SAVE */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-3 bg-[#9b2936] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#84232e]"
          >
            <Save size={18} />
            Save Today's Sharing
          </button>
        </div>

      </div>
    </main>
  );
}

export default AdminDashboard;