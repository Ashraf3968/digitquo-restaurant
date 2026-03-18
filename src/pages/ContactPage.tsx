import { Link } from "react-router-dom";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { siteMeta } from "../data/site";

const contactDetails = [
  ["Address", siteMeta.address],
  ["Phone", siteMeta.phone],
  ["Email", siteMeta.email],
  ["Private Dining", "Available for celebrations, executive dinners, and curated hosting."],
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[92rem] px-4 py-12 sm:px-6 xl:px-8 2xl:px-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <MotionBlock>
          <SectionIntro eyebrow="Contact Us" title="A clean, premium contact page that keeps inquiries moving." description="This section combines clear contact details, a polished inquiry form, and a location preview to support both reservations and private event leads." />
          <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_55px_rgba(221,210,192,0.32)]">
            <div className="grid gap-4 text-sm leading-7 text-stone-600">
              {contactDetails.map(([label, value]) => (
                <div key={label} className="rounded-[1.35rem] bg-stone-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">{label}</p>
                  <p className="mt-1 text-sm leading-7 text-stone-700">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.75rem] bg-stone-100 p-4 text-sm text-stone-500">Google Maps embed placeholder for the restaurant location.</div>
            <div className="mt-6 flex flex-wrap gap-3">
              {siteMeta.hours.map((hour) => (
                <span key={hour} className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-600">{hour}</span>
              ))}
            </div>
          </div>
        </MotionBlock>

        <MotionBlock delay={0.08} className="rounded-[2.25rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-8">
          <form className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Name</label>
                <input className="form-input" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
                <input className="form-input" placeholder="you@example.com" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Phone</label>
                <input className="form-input" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Inquiry Type</label>
                <select className="form-input">
                  <option>Reservation support</option>
                  <option>Private dining</option>
                  <option>General inquiry</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Message</label>
              <textarea rows={6} className="form-input" placeholder="Tell us how we can help" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" className="w-fit rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Send inquiry</button>
              <Link to="/reservations" className="text-sm font-semibold text-stone-900 transition hover:text-amber-700">Need a table instead? Reserve now</Link>
            </div>
          </form>
        </MotionBlock>
      </div>
    </section>
  );
}
