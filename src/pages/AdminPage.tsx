import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { deleteReview, getAdminDashboard, updateReservationStatus, type ReservationItem, type ReviewItem } from "../lib/api";

const ADMIN_EMAIL = "admin@digitquo.local";
const ADMIN_PASSWORD = "DigitquoAdmin#2026";
const STORAGE_KEY = "digitquo-admin-session";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "active");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

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
    }),
    [reservations, reviews]
  );

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "active");
      setAuthorized(true);
      setError("");
      return;
    }
    setError("Use the built-in demo admin credentials to access the dashboard.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthorized(false);
    setEmail("");
    setPassword("");
  };

  const handleStatusChange = async (id: string, status: string) => {
    const updated = await updateReservationStatus(id, status);
    setReservations((current) => current.map((item) => (item.id === id ? updated : item)));
  };

  const handleDeleteReview = async (id: string) => {
    await deleteReview(id);
    setReviews((current) => current.filter((item) => item.id !== id));
  };

  if (!authorized) {
    return (
      <section className="mx-auto max-w-[118rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
        <div className="mx-auto max-w-lg rounded-[2.5rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-10">
          <SectionIntro eyebrow="Admin Panel" title="Built-in dashboard access for reservations and reviews." description="This admin panel is included inside the project and reads the same local JSON database used by the public site." align="center" />
          <form className="mt-8 grid gap-5" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Admin Email</label>
              <input className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@digitquo.local" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
              <input className="form-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" />
            </div>
            <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Open dashboard</button>
          </form>
          <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-sm leading-7 text-stone-600">
            Demo admin login: <strong>{ADMIN_EMAIL}</strong><br />Password: <strong>{ADMIN_PASSWORD}</strong>
          </div>
          {error ? <div className="mt-4 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</div> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[118rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionIntro eyebrow="Admin Panel" title="Manage reservations and shared reviews from one built-in dashboard." description="Everything below is powered by the project's own JSON database with no external service required." />
        <button type="button" onClick={handleLogout} className="rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-amber-300 hover:bg-amber-50">Logout</button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <StatCard label="Total reservations" value={String(totals.reservations)} />
        <StatCard label="Pending reservations" value={String(totals.pending)} />
        <StatCard label="Saved reviews" value={String(totals.reviews)} />
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <MotionBlock className="rounded-[2.25rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-8">
          <h2 className="text-2xl font-semibold text-stone-900">Reservations</h2>
          <p className="mt-2 text-sm leading-7 text-stone-600">Update status for every booking request submitted through the public reservation form.</p>
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
          <p className="mt-2 text-sm leading-7 text-stone-600">All public reviews submitted through the live site appear here and can be removed instantly.</p>
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
