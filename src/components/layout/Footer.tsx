import { Link } from "react-router-dom";
import { storeHours } from "../../data/seed";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="text-2xl font-semibold text-white">Mega Mart</div>
          <p className="text-sm leading-7 text-slate-400">
            Premium supermarket shopping with fast delivery, curated fresh categories, and enterprise-grade service design.
          </p>
          <div className="flex gap-3 text-sm">
            <a href="tel:+919876543210" className="rounded-full border border-slate-700 px-3 py-2">Call</a>
            <a href="https://wa.me/919876543210" className="rounded-full border border-slate-700 px-3 py-2">WhatsApp</a>
            <a href="https://instagram.com/megamart" className="rounded-full border border-slate-700 px-3 py-2">Instagram</a>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Quick Links</div>
          <div className="grid gap-3 text-sm">
            <Link to="/about">About Us</Link>
            <Link to="/products">Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Support</div>
          <div className="grid gap-3 text-sm text-slate-300">
            <div>help@megamart.com</div>
            <div>27 Market Square, Kolkata</div>
            <div>Priority support for corporate and bulk orders</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Opening Hours</div>
          <div className="grid gap-3 text-sm text-slate-300">
            {storeHours.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[24px] border border-slate-800 bg-slate-900/80 p-4">
            <div className="text-sm font-semibold text-white">Weekly retail briefing</div>
            <div className="mt-2 flex gap-2">
              <input className="w-full rounded-full border border-slate-700 bg-transparent px-4 py-2 text-sm text-white outline-none" placeholder="Email address" />
              <button type="button" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Join</button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-sm text-slate-500">© 2026 Mega Mart. All rights reserved.</div>
    </footer>
  );
}
