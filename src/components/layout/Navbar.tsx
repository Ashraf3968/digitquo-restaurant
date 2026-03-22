import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/categories", label: "Categories" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">MM</div>
          <div>
            <div className="text-lg font-semibold text-slate-950">Mega Mart</div>
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Premium Supermarket</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-emerald-700" : "text-slate-600 hover:text-slate-950"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/cart" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            Cart ({itemCount})
          </Link>
          {user ? (
            <>
              <span className="text-sm text-slate-600">{user.name}</span>
              <button type="button" onClick={logout} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
              Sign in
            </Link>
          )}
        </div>

        <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm lg:hidden" onClick={() => setOpen((value) => !value)}>
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/cart" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              Cart ({itemCount})
            </Link>
            <Link to={user ? "/admin" : "/login"} className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              {user ? user.name : "Sign in"}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
