import { useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import { storeHours } from "../data/seed";
import { submitInquiry } from "../lib/api";

export default function ContactPage() {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Contact" title="Reach Mega Mart through support, order, and social channels" description="A complete contact setup with local form handling, support copy, opening hours, map placeholder, and fast-action contact options." />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Call", "+91 98765 43210"],
                ["WhatsApp", "+91 98765 43210"],
                ["Instagram", "@megamart"],
                ["Email", "help@megamart.com"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="text-sm uppercase tracking-[0.24em] text-emerald-200">{label}</div>
                  <div className="mt-2 text-lg font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
            <div className="text-lg font-semibold text-slate-950">Opening Hours</div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600">
              {storeHours.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
              <div className="flex h-56 items-center justify-center bg-[linear-gradient(135deg,#d1fae5,#ecfeff)] text-center text-sm text-slate-600">
                Map placeholder
                <br />
                27 Market Square, Kolkata
              </div>
            </div>
          </div>
        </div>
        <form
          className="space-y-5 rounded-[32px] bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.05)]"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const result = await submitInquiry({
              name: String(formData.get("name") ?? ""),
              email: String(formData.get("email") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              subject: String(formData.get("subject") ?? ""),
              message: String(formData.get("message") ?? ""),
              type: String(formData.get("type") ?? "contact") as "contact" | "support" | "order",
            });
            setFeedback(result.mailPreview);
            event.currentTarget.reset();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" required className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Your name" />
            <input name="email" required className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Email address" />
            <input name="phone" required className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Phone number" />
            <select name="type" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400">
              <option value="contact">General contact</option>
              <option value="support">Support request</option>
              <option value="order">Order inquiry</option>
            </select>
          </div>
          <input name="subject" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Subject" />
          <textarea name="message" required rows={6} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Tell us how we can help." />
          <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Send message</button>
          {feedback ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{feedback}</div> : null}
        </form>
      </div>
    </div>
  );
}
