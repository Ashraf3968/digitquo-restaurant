import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems, siteMeta } from "../../data/site";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 py-4 sm:px-4 xl:px-5 2xl:px-6">
      <div
        className={`mx-auto flex max-w-[118rem] items-center justify-between rounded-full border border-stone-200/80 bg-white/96 px-5 py-3 shadow-[0_18px_55px_rgba(215,193,166,0.2)] transition-all duration-300 sm:px-6 ${
          scrolled ? "py-2.5 shadow-[0_20px_60px_rgba(183,146,96,0.18)]" : ""
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-stone-900 text-sm font-semibold tracking-[0.3em] text-white shadow-lg shadow-stone-900/10">
            {siteMeta.shortBrand}
          </div>
          <div>
            <div className="font-serif text-lg tracking-[0.2em] text-stone-900">{siteMeta.brand}</div>
            <div className="text-[10px] uppercase tracking-[0.34em] text-stone-500">Modern Dining House</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 xl:gap-9 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative text-sm font-medium text-stone-600 transition duration-300 hover:scale-[1.03] hover:text-stone-900 ${isActive ? "text-stone-900" : ""}`
              }
            >
              <span className="relative z-10">{item.label}</span>
              <span className="pointer-events-none absolute inset-x-[-0.85rem] bottom-[-0.6rem] h-8 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.2)_0%,rgba(251,191,36,0.08)_38%,transparent_72%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-[-0.2rem] h-px origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-orange-400 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="rounded-full border border-stone-200 px-5 py-2 text-sm font-medium text-stone-700 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-stone-900"
          >
            {isLoggedIn ? `Account | ${user?.name?.split(" ")[0] ?? "Member"}` : "Login"}
          </Link>
          <Link
            to="/reservations"
            className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-stone-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800"
          >
            Book a Table
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-stone-200 text-stone-800 transition duration-300 hover:border-amber-300 hover:bg-amber-50 lg:hidden"
          aria-label="Toggle navigation"
        >
          <div className="relative h-4 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-[118rem] overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/98 p-4 shadow-[0_24px_70px_rgba(215,193,166,0.25)] lg:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition duration-300 hover:bg-amber-50 hover:text-stone-900"
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-2xl border border-stone-200 px-4 py-3 text-center text-sm font-medium text-stone-700 transition duration-300 hover:bg-amber-50">
                  {isLoggedIn ? "Account" : "Login"}
                </Link>
                <Link to="/reservations" onClick={() => setOpen(false)} className="rounded-2xl bg-stone-900 px-4 py-3 text-center text-sm font-semibold text-white transition duration-300 hover:bg-stone-800">
                  Book a Table
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}