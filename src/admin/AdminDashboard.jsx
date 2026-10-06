import { useEffect, useState } from "react";
import {
  Save,
  Beef,
  CircleCheck,
  Truck,
  Megaphone,
  LockKeyhole,
  LogOut,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const [token, setToken] = useState(
    localStorage.getItem("halal_admin_token")
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [meats, setMeats] = useState([]);
  const [announcement, setAnnouncement] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Login failed."
        );
      }

      localStorage.setItem(
        "halal_admin_token",
        data.token
      );

      setToken(data.token);
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD SHARING
  // --------------------------------------------------

  useEffect(() => {
    if (!token) return;

    const loadSharing = async () => {
      try {
        const response = await fetch(
          `${API_URL}/sharing`
        );

        if (!response.ok) {
          throw new Error(
            "Could not load sharing information."
          );
        }

        const data = await response.json();

        setMeats(data.meats || []);
        setAnnouncement(
          data.announcement || ""
        );
      } catch (err) {
        setError(err.message);
      }
    };

    loadSharing();
  }, [token]);

  // --------------------------------------------------
  // UPDATE MEAT
  // --------------------------------------------------

  const updateMeat = (
    index,
    field,
    value
  ) => {
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

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/sharing`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            meats,
            announcement,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem(
          "halal_admin_token"
        );

        setToken(null);

        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Could not save changes."
        );
      }

      setMessage(
        "Today's Sharing has been updated successfully."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem(
      "halal_admin_token"
    );

    setToken(null);
    setMeats([]);
    setAnnouncement("");
    setMessage("");
    setError("");
  };

  // --------------------------------------------------
  // LOGIN SCREEN
  // --------------------------------------------------

  if (!token) {
    return (
      <main className="flex min-h-screen bg-[#111111] text-white">
        <div className="mx-auto flex w-full max-w-[520px] flex-col justify-center px-6 py-12">

          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c99a5b]">
              Halal MeatHub
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Admin
              <br />
              Dashboard
            </h1>

            <p className="mt-5 text-sm leading-6 text-white/45">
              Sign in to manage today's meat sharing
              information.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="border border-white/10 bg-[#181818] p-6 sm:p-8"
          >
            <div className="mb-7 flex h-11 w-11 items-center justify-center bg-[#9b2936]">
              <LockKeyhole size={19} />
            </div>

            <h2 className="text-xl font-bold">
              Admin login
            </h2>

            {error && (
              <div className="mt-5 border border-[#d7263d]/30 bg-[#d7263d]/10 px-4 py-3 text-sm text-[#ff9ca7]">
                {error}
              </div>
            )}

            <label className="mt-7 block">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-white/45">
                Username
              </span>

              <input
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                autoComplete="username"
                required
                className="mt-2 w-full border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-[#c99a5b]"
                placeholder="Enter username"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-white/45">
                Password
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
                className="mt-2 w-full border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-[#c99a5b]"
                placeholder="Enter password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center bg-[#9b2936] px-5 py-4 text-sm font-bold transition hover:bg-[#84232e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </button>
          </form>

          <a
            href="/"
            className="mt-6 text-center text-sm font-semibold text-white/40 transition hover:text-white"
          >
            ← Back to website
          </a>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // ADMIN DASHBOARD
  // --------------------------------------------------

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

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden border border-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-black sm:block"
            >
              View website
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white hover:text-black"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-12 lg:py-14">

        <div className="max-w-[750px]">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#9b2936]">
            Live information
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Update what customers see today.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#666]">
            Manage meat availability, prices, portions,
            sharing status, collection, dispatch and
            announcements.
          </p>
        </div>

        {/* SUCCESS */}
        {message && (
          <div className="mt-8 border border-[#43875b]/20 bg-[#43875b]/10 px-6 py-4 text-sm font-semibold text-[#43875b]">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-8 border border-[#d7263d]/20 bg-[#d7263d]/5 px-6 py-4 text-sm font-semibold text-[#d7263d]">
            {error}
          </div>
        )}

        {/* MEATS */}
        <div className="mt-10 space-y-5">

          {meats.map((meat, index) => (
            <section
              key={meat.name}
              className="border border-[#171717]/10 bg-white"
            >

              {/* HEADER */}
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
                    onChange={(event) =>
                      updateMeat(
                        index,
                        "available",
                        event.target.checked
                      )
                    }
                    className="h-5 w-5 accent-[#9b2936]"
                  />

                  Available today
                </label>

              </div>

              {/* FIELDS */}
              <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2 lg:grid-cols-4">

                <label>
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
                      onChange={(event) =>
                        updateMeat(
                          index,
                          "price",
                          event.target.value
                        )
                      }
                      className="w-full bg-transparent px-3 py-3 outline-none"
                    />
                  </div>
                </label>

                <label>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                    Portions remaining
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={meat.portions}
                    onChange={(event) =>
                      updateMeat(
                        index,
                        "portions",
                        event.target.value
                      )
                    }
                    className="mt-2 w-full border border-[#171717]/15 bg-[#f8f6f1] px-4 py-3 outline-none"
                  />
                </label>

                <label>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                    Portion size
                  </span>

                  <input
                    type="text"
                    value={meat.portionSize}
                    onChange={(event) =>
                      updateMeat(
                        index,
                        "portionSize",
                        event.target.value
                      )
                    }
                    className="mt-2 w-full border border-[#171717]/15 bg-[#f8f6f1] px-4 py-3 outline-none"
                  />
                </label>

                <label>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777]">
                    Sharing status
                  </span>

                  <select
                    value={meat.status}
                    onChange={(event) =>
                      updateMeat(
                        index,
                        "status",
                        event.target.value
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

              {/* COLLECTION / DISPATCH */}
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
                    onChange={(event) =>
                      updateMeat(
                        index,
                        "collection",
                        event.target.checked
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
                    onChange={(event) =>
                      updateMeat(
                        index,
                        "dispatch",
                        event.target.checked
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
            onChange={(event) =>
              setAnnouncement(event.target.value)
            }
            rows={4}
            className="mt-6 w-full resize-none border border-[#171717]/15 bg-[#f8f6f1] px-4 py-4 outline-none"
            placeholder="Write today's announcement..."
          />

        </section>

        {/* SAVE */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-3 bg-[#9b2936] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#84232e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Today's Sharing"}
          </button>
        </div>

      </div>
    </main>
  );
}

export default AdminDashboard;