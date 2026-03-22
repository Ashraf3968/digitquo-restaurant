import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <div className="rounded-[36px] bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">New Account</div>
        <h1 className="mt-4 font-display text-4xl text-slate-950">Create your Mega Mart account</h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const result = await signup({
              name: String(formData.get("name") ?? ""),
              email: String(formData.get("email") ?? ""),
              password: String(formData.get("password") ?? ""),
              confirmPassword: String(formData.get("confirmPassword") ?? ""),
            });
            if (result.ok) {
              navigate("/products");
              return;
            }
            setMessage(result.message ?? "Signup failed.");
          }}
        >
          <input name="name" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Full name" />
          <input name="email" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Email" />
          <input name="password" type="password" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Password" />
          <input name="confirmPassword" type="password" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Confirm password" />
          <button type="submit" className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Create account</button>
          {message ? <div className="text-sm text-rose-600">{message}</div> : null}
        </form>
        <div className="mt-4 text-sm text-slate-600">
          Already registered? <Link to="/login" className="font-semibold text-emerald-700">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
