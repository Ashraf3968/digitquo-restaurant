import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import {
  deleteReview,
  deleteUser,
  getAdminDashboard,
  updateReservationStatus,
  updateUserStatus,
  type AdminUser,
  type ReservationItem,
  type ReviewItem,
} from "../lib/api";

const ADMIN_EMAIL = "adminaccess@digitquo.com";
const ADMIN_PASSWORD = "giveadminaccess@digitquo";
const STORAGE_KEY = "digitquo-admin-session";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "active");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    if (!authorized) {
      return;
    }

    let active = true;
    async function loadDashboard() {
      try {
        setLoading(true);
        const data = await getAdminDashboard();
        if (active) {
          setReservations(data.reservations);
          setReviews(data.reviews);
          setUsers(data.users);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();
    return () => {
      active = false;
    };
  }, [authorized]);

  const totals = useMemo(
    () => ({
      reservations: reservations.length,
      pending: reservations.filter((item) => item.status === "Pending").length,
      reviews: reviews.length,
      users: users.length,
      suspended: users.filter((item) => item.status === "Suspended").length,
      activeUsers: users.filter((item) => item.status === "Active").length,
    }),
    [reservations, reviews, users]
  );

  const filteredUsers = useMemo(() => {
    const query = userQuery.trim().toLowerCase();
    if (!query) {
      return users;
    }
    return users.filter((user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.id.toLowerCase().includes(query));
  }, [users, userQuery]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "active");
      setAuthorized(true);
      setError("");
      return;
    }
    setError("Use the configured admin credentials to access the dashboard.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthorized(false);
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    const updated = await updateReservationStatus(id, status);
    setReservations((current) => current.map((item) => (item.id === id ? updated : item)));
  };

  const handleDeleteReview = async (id: string) => {
    await deleteReview(id);
    setReviews((current) => current.filter((item) => item.id !== id));
  };

  const handleUserStatusToggle = async (user: AdminUser) => {
    const nextStatus = user.status === "Active" ? "Suspended" : "Active";
    const updated = await updateUserStatus(user.id, nextStatus);
    setUsers((current) => current.map((item) => (item.id === user.id ? updated : item)));
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    setUsers((current) => current.filter((item) => item.id !== userId));
  };

  if (!authorized) {
    return (
      <section className="mx-auto max-w-[118rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
        <div className="mx-auto max-w-lg rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-10">
          <SectionIntro eyebrow="Admin Panel" title="Built-in dashboard access for reservations, reviews, and users." description="This admin panel is included inside the project and reads the same local JSON data used by the public site." align="center" />
          <form className="mt-8 grid gap-5" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Admin Email</label>
              <input className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="adminaccess@digitquo.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
              <div className="relative">
                <input className="form-input pr-24" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-stone-200 px-3 py-1 text-xs font-semibold text-stone-700">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Open dashboard</button>
          </form>
          <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-sm leading-7 text-stone-600">
            Admin email: <strong>{ADMIN_EMAIL}</strong><br />Password: <strong>{ADMIN_PASSWORD}</strong>
          </div>
          {error ? <div className="mt-4 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</div> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[118rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionIntro eyebrow="Admin Panel" title="Manage reservations, reviews, and users from one built-in dashboard." description="Everything below is powered by the project's own local data with no external service required." />
        <button type="button" onClick={handleLogout} className="rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-amber-300 hover:bg-amber-50">Logout</button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Reservations" value={String(totals.reservations)} />
        <StatCard label="Pending" value={String(totals.pending)} />
        <StatCard label="Reviews" value={String(totals.reviews)} />
        <StatCard label="Users" value={String(totals.users)} />
        <StatCard label="Active Users" value={String(totals.activeUsers)} />
        <StatCard label="Suspended" value={String(totals.suspended)} />
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <MotionBlock className="rounded-[2.25rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900">Reservations</h2>
              <p className="mt-2 text-sm leading-7 text-stone-600">Update status for every booking request submitted through the public reservation form.</p>
            </div>
            <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">Priority queue: {totals.pending}</div>
          </div>
          <div className="mt-6 grid gap-4">
            {loading ? <p className="text-sm text-stone-500">Loading reservations...</p> : null}
            {!loading && reservations.length === 0 ? <p className="text-sm text-stone-500">No reservations have been submitted yet.</p> : null}
            {reservations.map((reservation) => (
              <div key={reservation.id} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">{reservation.fullName}</h3>
                    <p className="mt-1 text-sm text-stone-500">{reservation.date} at {reservation.time} for {reservation.guests} guests</p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{reservation.email} | {reservation.phone}</p>
                    <p className="text-sm leading-7 text-stone-600">{reservation.seating} | {reservation.occasion}</p>
                    {reservation.specialRequests ? <p className="mt-2 text-sm leading-7 text-stone-600">{reservation.specialRequests}</p> : null}
                  </div>
                  <select className="form-input max-w-[12rem]" value={reservation.status} onChange={(event) => void handleStatusChange(reservation.id, event.target.value)}>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </MotionBlock>

        <MotionBlock className="rounded-[2.25rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-8">
          <h2 className="text-2xl font-semibold text-stone-900">Reviews</h2>
          <p className="mt-2 text-sm leading-7 text-stone-600">Moderate public reviews submitted through the live site.</p>
          <div className="mt-6 grid gap-4">
            {loading ? <p className="text-sm text-stone-500">Loading reviews...</p> : null}
            {!loading && reviews.length === 0 ? <p className="text-sm text-stone-500">No reviews have been submitted yet.</p> : null}
            {reviews.map((review) => (
              <div key={review.id} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">{review.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">{review.role} | {review.rating}/5</p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{review.quote}</p>
                  </div>
                  <button type="button" onClick={() => void handleDeleteReview(review.id)} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </MotionBlock>
      </div>

      <MotionBlock className="mt-8 rounded-[2.25rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900">Users</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">Suspend, reactivate, search, and remove accounts from one place.</p>
          </div>
          <div className="w-full max-w-sm">
            <input className="form-input" value={userQuery} onChange={(event) => setUserQuery(event.target.value)} placeholder="Search by name, email, or user ID" />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm text-stone-700">
            <thead>
              <tr className="text-xs uppercase tracking-[0.2em] text-stone-500">
                <th className="px-4">User</th>
                <th className="px-4">Status</th>
                <th className="px-4">Password</th>
                <th className="px-4">Created</th>
                <th className="px-4">Last Login</th>
                <th className="px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="px-4 py-3 text-stone-500" colSpan={6}>Loading users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td className="px-4 py-3 text-stone-500" colSpan={6}>No matching users found.</td></tr>
              ) : (
                filteredUsers.map((account) => (
                  <tr key={account.id} className="rounded-2xl bg-stone-50">
                    <td className="rounded-l-2xl px-4 py-4 align-top">
                      <p className="font-semibold text-stone-900">{account.name}</p>
                      <p className="mt-1 text-stone-600">{account.email}</p>
                      <p className="mt-1 text-xs text-stone-400">{account.id}</p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${account.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">{account.password}</td>
                    <td className="px-4 py-4 align-top text-stone-600">{formatDate(account.createdAt)}</td>
                    <td className="px-4 py-4 align-top text-stone-600">{account.lastLoginAt ? formatDate(account.lastLoginAt) : "Never"}</td>
                    <td className="rounded-r-2xl px-4 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => void handleUserStatusToggle(account)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${account.status === "Active" ? "border border-amber-200 text-amber-800 hover:bg-amber-50" : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"}`}>
                          {account.status === "Active" ? "Suspend" : "Reactivate"}
                        </button>
                        <button type="button" onClick={() => void handleDeleteUser(account.id)} className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </MotionBlock>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_55px_rgba(221,210,192,0.24)]">
      <p className="text-sm uppercase tracking-[0.25em] text-stone-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-stone-900">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
