import { useState } from "react";
import {
ArrowUpRight,
CheckCircle2,
MapPin,
MessageCircle,
Send,
Truck,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const meatOptions = ["Cow", "Goat", "Ram"];

const shareOptions = [
"2kg",
"3kg",
"Quarter Cow",
"Half Cow",
"Other",
];

function Reservation() {
const [form, setForm] = useState({
name: "",
phone: "",
meat: "Cow",
share: "2kg",
quantity: 1,
method: "Collection",
address: "",
note: "",
});

const [status, setStatus] = useState("idle");
const [error, setError] = useState("");

const handleChange = (event) => {
const { name, value } = event.target;

setForm((current) => ({
  ...current,
  [name]: value,
}));

};

const handleSubmit = async (event) => {
event.preventDefault();

setStatus("loading");
setError("");

try {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...form,
      quantity: Number(form.quantity),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to send reservation.");
  }

  setStatus("success");

  setForm({
    name: "",
    phone: "",
    meat: "Cow",
    share: "2kg",
    quantity: 1,
    method: "Collection",
    address: "",
    note: "",
  });
} catch (err) {
  setStatus("error");
  setError(
    err.message || "Something went wrong. Please try again."
  );
}

};

return ( <section
   id="reserve"
   className="relative overflow-hidden bg-[#f4f0e8] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
 > <div className="mx-auto max-w-7xl"> <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
{/* INTRO */} <div className="lg:sticky lg:top-32"> <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#9b2936]">
Book a Share </p>

        <h2 className="max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#171717] sm:text-5xl lg:text-6xl">
          Reserve your meat before sharing starts.
        </h2>

        <p className="mt-7 max-w-lg text-base leading-7 text-black/60 sm:text-lg">
          Tell us what you want, how much you need, and whether you will
          collect from the Hub or need delivery.
        </p>

        <div className="mt-10 space-y-5 border-t border-black/10 pt-7">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#9b2936] text-white">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="font-semibold text-[#171717]">
                Simple reservation
              </p>
              <p className="mt-1 text-sm leading-6 text-black/55">
                No complicated checkout or unnecessary steps.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#171717] text-white">
              <Truck size={18} />
            </div>

            <div>
              <p className="font-semibold text-[#171717]">
                Collection or delivery
              </p>
              <p className="mt-1 text-sm leading-6 text-black/55">
                Choose what works best for you.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#171717] text-white">
              <MessageCircle size={18} />
            </div>

            <div>
              <p className="font-semibold text-[#171717]">
                WhatsApp follow-up
              </p>
              <p className="mt-1 text-sm leading-6 text-black/55">
                We can confirm the details with you directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        {status === "success" ? (
          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center bg-[#9b2936] text-white">
              <CheckCircle2 size={30} />
            </div>

            <h3 className="mt-7 text-3xl font-semibold tracking-tight text-[#171717]">
              Reservation received.
            </h3>

            <p className="mt-4 max-w-md leading-7 text-black/60">
              Your request has been sent to Halal MeatHub. We will review
              your reservation and contact you to confirm the details.
            </p>

            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 inline-flex items-center gap-2 border border-black/15 px-6 py-3 text-sm font-semibold transition hover:bg-[#171717] hover:text-white"
            >
              Make another reservation
              <ArrowUpRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                Reservation details
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#171717]">
                Tell us what you need.
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* NAME */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#171717]">
                  Full name
                </span>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border border-black/15 bg-[#faf9f6] px-4 py-3.5 outline-none transition focus:border-[#9b2936]"
                />
              </label>

              {/* PHONE */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#171717]">
                  WhatsApp / Phone
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="0903..."
                  className="w-full border border-black/15 bg-[#faf9f6] px-4 py-3.5 outline-none transition focus:border-[#9b2936]"
                />
              </label>

              {/* MEAT */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#171717]">
                  Meat
                </span>

                <select
                  name="meat"
                  value={form.meat}
                  onChange={handleChange}
                  className="w-full border border-black/15 bg-[#faf9f6] px-4 py-3.5 outline-none focus:border-[#9b2936]"
                >
                  {meatOptions.map((meat) => (
                    <option key={meat} value={meat}>
                      {meat}
                    </option>
                  ))}
                </select>
              </label>

              {/* SHARE */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#171717]">
                  Share
                </span>

                <select
                  name="share"
                  value={form.share}
                  onChange={handleChange}
                  className="w-full border border-black/15 bg-[#faf9f6] px-4 py-3.5 outline-none focus:border-[#9b2936]"
                >
                  {shareOptions.map((share) => (
                    <option key={share} value={share}>
                      {share}
                    </option>
                  ))}
                </select>
              </label>

              {/* QUANTITY */}
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#171717]">
                  Number of shares
                </span>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="100"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  className="w-full border border-black/15 bg-[#faf9f6] px-4 py-3.5 outline-none focus:border-[#9b2936]"
                />
              </label>

              {/* METHOD */}
              <div>
                <span className="mb-2 block text-sm font-medium text-[#171717]">
                  How will you receive it?
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {["Collection", "Delivery"].map((method) => (
                    <label
                      key={method}
                      className={`flex cursor-pointer items-center justify-center border px-3 py-3.5 text-sm font-semibold transition ${
                        form.method === method
                          ? "border-[#9b2936] bg-[#9b2936] text-white"
                          : "border-black/15 bg-[#faf9f6] text-[#171717] hover:border-black/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={method}
                        checked={form.method === method}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              {/* ADDRESS */}
              {form.method === "Delivery" && (
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-[#171717]">
                    Delivery address
                  </span>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-4 text-black/35"
                    />

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      placeholder="Where should we deliver?"
                      className="w-full resize-none border border-black/15 bg-[#faf9f6] py-3.5 pl-11 pr-4 outline-none transition focus:border-[#9b2936]"
                    />
                  </div>
                </label>
              )}

              {/* NOTE */}
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-[#171717]">
                  Note{" "}
                  <span className="font-normal text-black/35">
                    (optional)
                  </span>
                </span>

                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Anything we should know?"
                  className="w-full resize-none border border-black/15 bg-[#faf9f6] px-4 py-3.5 outline-none transition focus:border-[#9b2936]"
                />
              </label>
            </div>

            {error && (
              <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 flex w-full items-center justify-center gap-2 bg-[#9b2936] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#84232e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                "Sending reservation..."
              ) : (
                <>
                  Send Reservation Request
                  <Send size={17} />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-black/40">
              Your reservation is a request. We will contact you to confirm
              availability and details.
            </p>
          </form>
        )}
      </div>
    </div>
  </div>
</section>

);
}

export default Reservation;