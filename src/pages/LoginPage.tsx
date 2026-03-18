import { Link } from "react-router-dom";
import MotionBlock from "../components/common/MotionBlock";
import { siteMeta } from "../data/site";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="grid min-h-[70vh] gap-8 lg:grid-cols-[1fr_0.95fr]">
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
            <h2 className="mt-6 text-3xl font-semibold text-stone-900">Welcome back</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">Sign in to manage reservations, event requests, and member updates.</p>
          </div>
          <form className="mt-8 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
              <input className="form-input" type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
              <input className="form-input" type="password" placeholder="Enter password" />
            </div>
            <div className="flex items-center justify-between text-sm text-stone-500">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-stone-300" /> Remember me</label>
              <button type="button" className="font-medium text-stone-800">Forgot password?</button>
            </div>
            <button type="button" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Login</button>
            <p className="text-center text-sm text-stone-500">New here? <Link to="/contact" className="font-semibold text-stone-900">Create account</Link></p>
          </form>
        </MotionBlock>
      </div>
    </section>
  );
}

