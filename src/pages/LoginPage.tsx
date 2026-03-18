import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import MotionBlock from "../components/common/MotionBlock";
import { useAuth } from "../context/AuthContext";
import { siteMeta } from "../data/site";

export default function LoginPage() {
  const { isLoggedIn, login, logout, signup, user } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = login({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    setMessage(result.ok ? "Welcome back. Your member account is now active." : result.message ?? "");
    if (result.ok) {
      event.currentTarget.reset();
    }
  };

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = signup({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    });

    setMessage(result.ok ? "Account created successfully. You are now logged in." : result.message ?? "");
    if (result.ok) {
      event.currentTarget.reset();
    }
  };

  return (
    <section className="mx-auto max-w-[92rem] px-4 py-12 sm:px-6 xl:px-8 2xl:px-10 lg:py-16">
      <div className="grid min-h-[70vh] gap-8 lg:grid-cols-[1fr_0.95fr] xl:gap-12">
        <MotionBlock className="hidden rounded-[2.5rem] bg-[linear-gradient(160deg,_rgba(255,255,255,0.7),_rgba(245,238,228,0.92))] p-10 shadow-[0_28px_80px_rgba(221,210,192,0.36)] lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700/80">Member Access</p>
            <h1 className="mt-6 font-serif text-5xl leading-tight text-stone-900">A premium login experience for reservations and guest perks.</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-stone-600">Designed with the same refined visual language as the restaurant brand to feel credible, calm, and portfolio-worthy.</p>
          </div>
          <div className="rounded-[2rem] bg-white/80 p-6">
            <p className="font-semibold text-stone-900">{siteMeta.brand}</p>
            <p className="mt-2 text-sm leading-7 text-stone-600">Private dining requests, saved reservations, member updates, and concierge-level communication in one elegant guest hub.</p>
          </div>
        </MotionBlock>
        <MotionBlock delay={0.08} className="mx-auto flex w-full max-w-xl flex-col justify-center rounded-[2.5rem] border border-white/70 bg-white/85 p-8 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-10">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-stone-900 text-lg font-semibold tracking-[0.3em] text-white">{siteMeta.shortBrand}</div>
            <h2 className="mt-6 text-3xl font-semibold text-stone-900">{isLoggedIn ? "Your account" : "Welcome back"}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {isLoggedIn
                ? "Manage reservations, private dining requests, and member preferences from one premium dashboard."
                : "Sign in or create an account to manage reservations, event requests, and member updates."}
            </p>
          </div>

          {isLoggedIn ? (
            <div className="mt-8 grid gap-5">
              <div className="rounded-[1.75rem] bg-stone-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Member profile</p>
                <h3 className="mt-3 text-2xl font-semibold text-stone-900">{user?.name}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{user?.email}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_16px_40px_rgba(221,210,192,0.25)]">
                  <p className="text-sm font-semibold text-stone-900">Upcoming reservations</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">No active bookings yet. Use the reservation page to secure your preferred table.</p>
                </div>
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_16px_40px_rgba(221,210,192,0.25)]">
                  <p className="text-sm font-semibold text-stone-900">Private dining</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">Save event preferences and manage premium dining requests from this member area.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/reservations" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">
                  Reserve now
                </Link>
                <button type="button" onClick={logout} className="rounded-full border border-stone-200 px-6 py-3.5 text-sm font-semibold text-stone-700 transition hover:border-amber-300 hover:bg-amber-50">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-2 gap-2 rounded-full bg-stone-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setMessage("");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === "login" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setMessage("");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}
                >
                  Create account
                </button>
              </div>

              {mode === "login" ? (
                <form className="mt-8 grid gap-5" onSubmit={handleLogin}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
                    <input className="form-input" name="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
                    <input className="form-input" name="password" type="password" placeholder="Enter password" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-500">
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-stone-300" /> Remember me</label>
                    <button type="button" className="font-medium text-stone-800">Forgot password?</button>
                  </div>
                  <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Login</button>
                  <p className="text-center text-sm text-stone-500">New here? <button type="button" onClick={() => setMode("signup")} className="font-semibold text-stone-900">Create account</button></p>
                </form>
              ) : (
                <form className="mt-8 grid gap-5" onSubmit={handleSignup}>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Full Name</label>
                    <input className="form-input" name="name" type="text" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
                    <input className="form-input" name="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
                    <input className="form-input" name="password" type="password" placeholder="Create a password" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Confirm Password</label>
                    <input className="form-input" name="confirmPassword" type="password" placeholder="Confirm password" />
                  </div>
                  <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Create account</button>
                  <p className="text-center text-sm text-stone-500">Already a member? <button type="button" onClick={() => setMode("login")} className="font-semibold text-stone-900">Login</button></p>
                </form>
              )}
            </>
          )}

          {message ? (
            <div className={`mt-6 rounded-[1.5rem] border p-4 text-sm ${message.toLowerCase().includes("success") || message.toLowerCase().includes("welcome") || message.toLowerCase().includes("created") ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
              {message}
            </div>
          ) : null}
        </MotionBlock>
      </div>
    </section>
  );
}

