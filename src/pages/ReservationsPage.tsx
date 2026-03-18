import { useState } from "react";
import type { FormEvent } from "react";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { siteMeta } from "../data/site";

const bookingNotes = [
  "Tables are held for 15 minutes unless our concierge team is notified.",
  "Private dining and celebration requests are reviewed manually.",
  "Dietary preferences and accessibility notes can be added in special requests.",
];

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
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
                <div key={note} className="rounded-[1.35rem] bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-600">{note}</div>
              ))}
            </div>
          </div>
        </MotionBlock>
        <MotionBlock delay={0.08} className="rounded-[2.25rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.35)] sm:p-8">
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Field label="Full Name" type="text" placeholder="Your full name" />
            <Field label="Phone Number" type="tel" placeholder="+91 98765 43210" />
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Number of Guests" type="number" placeholder="2" />
            <Field label="Date" type="date" />
            <Field label="Time" type="time" />
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Seating Preference</label>
              <select className="form-input">
                <option>Indoor lounge</option>
                <option>Window seating</option>
                <option>Private dining</option>
                <option>Chef's counter</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Occasion</label>
              <select className="form-input">
                <option>Casual dining</option>
                <option>Business dinner</option>
                <option>Celebration</option>
                <option>Anniversary</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-stone-700">Special Requests</label>
              <textarea rows={5} className="form-input" placeholder="Dietary preferences, celebration notes, or accessibility requests" />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
              <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">
                Submit Reservation
              </button>
              <p className="text-sm text-stone-500">Availability is typically confirmed within 15 minutes during service hours.</p>
            </div>
          </form>
          {submitted ? (
            <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-800">
              Reservation request received. A confirmation message has been prepared for this premium demo flow.
            </div>
          ) : null}
        </MotionBlock>
      </div>
    </section>
  );
}

type FieldProps = { label: string; type: string; placeholder?: string };

function Field({ label, type, placeholder }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-stone-700">{label}</label>
      <input type={type} placeholder={placeholder} className="form-input" />
    </div>
  );
}
