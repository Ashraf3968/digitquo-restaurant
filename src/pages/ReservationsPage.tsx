import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { useAuth } from "../context/AuthContext";
import { siteMeta } from "../data/site";
import { createReservation } from "../lib/api";

const bookingNotes = [
  "Tables are held for 15 minutes unless our concierge team is notified.",
  "Private dining and celebration requests are reviewed manually.",
  "Dietary preferences and accessibility notes can be added in special requests.",
];

export default function ReservationsPage() {
  const { isLoggedIn, user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn) {
      setSubmitted(false);
      setMessage("Please login first to submit a reservation request.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    try {
      setSubmitting(true);
      setSubmitted(false);
      setMessage("");
      await createReservation({
        fullName: String(formData.get("fullName") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? ""),
        guests: Number(formData.get("guests") ?? 0),
        date: String(formData.get("date") ?? ""),
        time: String(formData.get("time") ?? ""),
        seating: String(formData.get("seating") ?? "Indoor lounge"),
        occasion: String(formData.get("occasion") ?? "Casual dining"),
        specialRequests: String(formData.get("specialRequests") ?? ""),
      });
      setSubmitted(true);
      event.currentTarget.reset();
    } catch (error) {
      setSubmitted(false);
      setMessage(error instanceof Error ? error.message : "Could not submit the reservation right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-[118rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <MotionBlock>
          <SectionIntro eyebrow="Reservations" title="A polished booking experience designed to convert with confidence." description="This reservation interface is built like a premium hospitality product: clear, elegant, and effortless to complete on any device." />
          <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_55px_rgba(221,210,192,0.3)]">
            <h3 className="text-xl font-semibold text-stone-900">Reservation information</h3>
            <div className="mt-4 grid gap-3 text-sm leading-7 text-stone-600">
              <p>Bookings are confirmed subject to availability. Private dining requests are reviewed within 2 business hours.</p>
              <p>For same-day reservations, please contact {siteMeta.phone} directly.</p>
              {siteMeta.hours.map((hour) => (
                <p key={hour}>{hour}</p>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              {bookingNotes.map((note) => (
                <div key={note} className="rounded-[1.35rem] bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-600">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </MotionBlock>
        <MotionBlock delay={0.08} className="rounded-[2.25rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.35)] sm:p-8">
          {!isLoggedIn ? (
            <div className="mb-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
              You need to login before making a reservation in this demo. <Link to="/login" className="font-semibold text-stone-900 underline-offset-4 hover:underline">Go to login</Link>
            </div>
          ) : null}
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <fieldset disabled={!isLoggedIn || submitting} className="grid gap-5 disabled:cursor-not-allowed disabled:opacity-60 sm:grid-cols-2">
              <Field label="Full Name" name="fullName" type="text" placeholder="Your full name" defaultValue={user?.name ?? ""} />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" defaultValue={user?.email ?? ""} />
              <Field label="Number of Guests" name="guests" type="number" placeholder="2" />
              <Field label="Date" name="date" type="date" />
              <Field label="Time" name="time" type="time" />
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Seating Preference</label>
                <select name="seating" className="form-input">
                  <option>Indoor lounge</option>
                  <option>Window seating</option>
                  <option>Private dining</option>
                  <option>Chef's counter</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Occasion</label>
                <select name="occasion" className="form-input">
                  <option>Casual dining</option>
                  <option>Business dinner</option>
                  <option>Celebration</option>
                  <option>Anniversary</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-stone-700">Special Requests</label>
                <textarea name="specialRequests" rows={5} className="form-input" placeholder="Dietary preferences, celebration notes, or accessibility requests" />
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
                <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">
                  {submitting ? "Saving..." : "Submit Reservation"}
                </button>
                <p className="text-sm text-stone-500">Availability is typically confirmed within 15 minutes during service hours.</p>
              </div>
            </fieldset>
          </form>
          {message ? <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">{message}</div> : null}
          {submitted ? <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-800">Reservation saved successfully. It is now visible in the built-in admin panel for follow-up.</div> : null}
        </MotionBlock>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
};

function Field({ label, name, type, placeholder, defaultValue }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-stone-700">{label}</label>
      <input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} className="form-input" />
    </div>
  );
}
