import { Link } from "react-router-dom";
import { navItems, siteMeta } from "../../data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-white/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-10">
        <div>
          <div className="font-serif text-2xl text-stone-900">{siteMeta.brand}</div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-stone-600">
            A refined, light-filled restaurant concept crafted to feel like a real portfolio-ready hospitality project.
          </p>
          <Link to="/reservations" className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">
            Reserve your table
          </Link>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">Navigation</h3>
          <div className="mt-5 grid gap-3 text-sm text-stone-600">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="transition hover:text-stone-900">
                {item.label}
              </Link>
            ))}
            <Link to="/terms" className="transition hover:text-stone-900">Terms & Conditions</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">Contact</h3>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-stone-600">
            <p>{siteMeta.address}</p>
            <p>{siteMeta.phone}</p>
            <p>{siteMeta.email}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">Opening Hours</h3>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-stone-600">
            {siteMeta.hours.map((hour) => (
              <p key={hour}>{hour}</p>
            ))}
          </div>
          <form className="mt-6 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-4">
            <label className="text-sm font-medium text-stone-900">Join the newsletter</label>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input className="min-w-0 flex-1 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm outline-none ring-0" placeholder="Email address" />
              <button type="button" className="rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-stone-200 px-4 py-5 text-center text-sm text-stone-500 sm:px-6 lg:px-10">
        Copyright {new Date().getFullYear()} {siteMeta.brand}. Crafted as a premium DIGITQUO portfolio project.
      </div>
    </footer>
  );
}
