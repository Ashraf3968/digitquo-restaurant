import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { siteMeta } from "../data/site";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <MotionBlock>
          <SectionIntro eyebrow="Contact Us" title="A clean, premium contact page that keeps inquiries moving." description="This section combines clear contact details, a polished inquiry form, and a location preview to support both reservations and private event leads." />
          <div className="mt-8 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_55px_rgba(221,210,192,0.32)]">
            <div className="grid gap-3 text-sm leading-7 text-stone-600">
              <p><span className="font-semibold text-stone-900">Address:</span> {siteMeta.address}</p>
              <p><span className="font-semibold text-stone-900">Phone:</span> {siteMeta.phone}</p>
              <p><span className="font-semibold text-stone-900">Email:</span> {siteMeta.email}</p>
            </div>
            <div className="mt-6 rounded-[1.75rem] bg-stone-100 p-4 text-sm text-stone-500">Google Maps embed placeholder for the restaurant location.</div>
          </div>
        </MotionBlock>
        <MotionBlock delay={0.08} className="rounded-[2.25rem] border border-white/70 bg-white/85 p-8 shadow-[0_24px_70px_rgba(221,210,192,0.34)]">
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
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Message</label>
              <textarea rows={6} className="form-input" placeholder="Tell us how we can help" />
            </div>
            <button type="button" className="w-fit rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Send inquiry</button>
          </form>
        </MotionBlock>
      </div>
    </section>
  );
}

