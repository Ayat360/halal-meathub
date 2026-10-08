import { useEffect, useState } from "react";
import {
  Save,
  Beef,
  CircleCheck,
  Truck,
  Megaphone,
  LockKeyhole,
  LogOut,
  ClipboardList,
  Phone,
  MapPin,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

function AdminDashboard() {
  // IMPORTANT:
  // Do not automatically restore an old admin token.
  // The admin must log in whenever /admin is opened.
  const [token, setToken] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [meats, setMeats] = useState([]);
  const [announcement, setAnnouncement] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [reservations, setReservations] = useState([]);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [reservationError, setReservationError] = useState("");
  const [reservationUpdating, setReservationUpdating] = useState(null);

  const reservationStats = {
    total: reservations.length,
    pending: reservations.filter(
      (reservation) => reservation.status === "Pending"
    ).length,
    confirmed: reservations.filter(
      (reservation) => reservation.status === "Confirmed"
    ).length,
    ready: reservations.filter(
      (reservation) => reservation.status === "Ready"
    ).length,
  };

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");
    setReservationError("");

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      const newToken = data.token;

      // Store the fresh token.
      localStorage.setItem("halal_admin_token", newToken);

      // Open dashboard.
      setToken(newToken);
      setPassword("");

      // IMPORTANT:
      // Load reservations using the fresh token immediately.
      await loadReservations(newToken);
    } catch (err) {
      setError(err.message || "Login failed.");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOAD RESERVATIONS
  // --------------------------------------------------

  const loadReservations = async (authToken = token) => {
    if (!authToken) return;

    setReservationLoading(true);
    setReservationError("");

    try {
      const response = await fetch(
        `${API_URL}/admin/reservations`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();

      // If the token is invalid, force login again.
      if (response.status === 401) {
        localStorage.removeItem("halal_admin_token");
        setToken(null);
        setReservations([]);

        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load reservations."
        );
      }

      setReservations(data);
    } catch (error) {
      setReservationError(
        error.message || "Failed to load reservations."
      );
    } finally {
      setReservationLoading(false);
    }
  };

  // --------------------------------------------------
  // UPDATE RESERVATION STATUS
  // --------------------------------------------------

  const updateReservationStatus = async (
    reservationId,
    status
  ) => {
    if (!token) return;

    setReservationUpdating(reservationId);
    setReservationError("");

    try {
      const response = await fetch(
        `${API_URL}/admin/reservations/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("halal_admin_token");
        setToken(null);
        setReservations([]);

        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update reservation."
        );
      }

      setReservations((current) =>
        current.map((reservation) =>
          reservation.id === reservationId
            ? {
                ...reservation,
                status,
              }
            : reservation
        )
      );
    } catch (error) {
      setReservationError(
        error.message || "Failed to update reservation."
      );
    } finally {
      setReservationUpdating(null);
    }
  };

  // --------------------------------------------------
  // LOAD SHARING
  // --------------------------------------------------

  useEffect(() => {
    if (!token) return;

    const loadSharing = async () => {
      try {
        const response = await fetch(`${API_URL}/sharing`);

        if (!response.ok) {
          throw new Error(
            "Could not load sharing information."
          );
        }

        const data = await response.json();

        setMeats(data.meats || []);
        setAnnouncement(data.announcement || "");
      } catch (err) {
        setError(err.message);
      }
    };

    loadSharing();
  }, [token]);

  // --------------------------------------------------
  // UPDATE MEAT
  // --------------------------------------------------

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

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const handleSave = async () => {
    if (!token) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/sharing`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meats,
          announcement,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("halal_admin_token");
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
    localStorage.removeItem("halal_admin_token");

    setToken(null);
    setMeats([]);
    setAnnouncement("");
    setReservations([]);
    setMessage("");
    setError("");
    setReservationError("");
    setUsername("");
    setPassword("");
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
              {loading ? "Signing in..." : "Sign in"}
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

        {/* RESERVATIONS */}
        <section className="mt-10 border border-black/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b2936]">
                Customer reservations
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#171717]">
                Incoming Reservations
              </h2>

              <p className="mt-2 text-sm text-black/50">
                Review customer requests and update their progress.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-black/60">
              <ClipboardList size={18} />
              {reservations.length}{" "}
              {reservations.length === 1
                ? "reservation"
                : "reservations"}
            </div>
          </div>

          {/* RESERVATION STATS */}
          {!reservationLoading &&
            !reservationError &&
            reservations.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="border border-black/10 bg-[#faf9f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                    Total
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#171717]">
                    {reservationStats.total}
                  </p>
                </div>

                <div className="border border-black/10 bg-[#faf9f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                    Pending
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#9b2936]">
                    {reservationStats.pending}
                  </p>
                </div>

                <div className="border border-black/10 bg-[#faf9f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                    Confirmed
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#171717]">
                    {reservationStats.confirmed}
                  </p>
                </div>

                <div className="border border-black/10 bg-[#faf9f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                    Ready
                  </p>

                  <p className="mt-2 text-2xl font-bold text-[#43875b]">
                    {reservationStats.ready}
                  </p>
                </div>
              </div>
            )}

          {reservationLoading ? (
            <div className="py-12 text-center text-sm text-black/50">
              Loading reservations...
            </div>
          ) : reservationError ? (
            <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {reservationError}
            </div>
          ) : reservations.length === 0 ? (
            <div className="py-12 text-center">
              <ClipboardList
                size={32}
                className="mx-auto text-black/20"
              />

              <p className="mt-4 font-semibold text-[#171717]">
                No reservations yet.
              </p>

              <p className="mt-1 text-sm text-black/45">
                Customer reservation requests will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {reservations.map((reservation) => (
                <article
                  key={reservation.id}
                  className="border border-black/10 bg-[#faf9f6] p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-[#171717]">
                          {reservation.name}
                        </h3>

                        <span className="border border-black/10 bg-white px-2.5 py-1 text-xs font-semibold">
                          #{reservation.id}
                        </span>

                        <span className="border border-[#9b2936]/20 bg-[#9b2936]/10 px-2.5 py-1 text-xs font-semibold text-[#9b2936]">
                          {reservation.status}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <span className="text-black/40">
                            Meat
                          </span>

                          <p className="mt-0.5 font-semibold">
                            {reservation.meat}
                          </p>
                        </div>

                        <div>
                          <span className="text-black/40">
                            Share
                          </span>

                          <p className="mt-0.5 font-semibold">
                            {reservation.share}
                          </p>
                        </div>

                        <div>
                          <span className="text-black/40">
                            Quantity
                          </span>

                          <p className="mt-0.5 font-semibold">
                            {reservation.quantity}
                          </p>
                        </div>

                        <div>
                          <span className="text-black/40">
                            Method
                          </span>

                          <p className="mt-0.5 font-semibold">
                            {reservation.method}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-2 text-sm text-black/60 sm:flex-row sm:flex-wrap sm:gap-5">
                        <a
                          href={`tel:${reservation.phone}`}
                          className="inline-flex items-center gap-2 font-semibold text-[#171717] hover:text-[#9b2936]"
                        >
                          <Phone size={15} />
                          {reservation.phone}
                        </a>

                        {reservation.method === "Delivery" &&
                          reservation.address && (
                            <span className="inline-flex items-start gap-2">
                              <MapPin
                                size={15}
                                className="mt-0.5 shrink-0"
                              />
                              {reservation.address}
                            </span>
                          )}
                      </div>

                      {reservation.note && (
                        <div className="mt-4 border-l-2 border-[#9b2936] pl-3 text-sm leading-6 text-black/55">
                          {reservation.note}
                        </div>
                      )}
                    </div>

                    <div className="w-full shrink-0 lg:w-48">
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
                        Update status
                      </label>

                      <select
                        value={reservation.status}
                        disabled={
                          reservationUpdating ===
                          reservation.id
                        }
                        onChange={(event) =>
                          updateReservationStatus(
                            reservation.id,
                            event.target.value
                          )
                        }
                        className="w-full border border-black/15 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#9b2936]"
                      >
                        {[
                          "Pending",
                          "Confirmed",
                          "Preparing",
                          "Ready",
                          "Dispatched",
                          "Completed",
                          "Cancelled",
                        ].map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>

                      {reservationUpdating ===
                        reservation.id && (
                        <p className="mt-2 text-xs text-black/40">
                          Updating...
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

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