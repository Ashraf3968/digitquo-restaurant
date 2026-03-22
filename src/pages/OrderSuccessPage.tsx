import { Link, useSearchParams } from "react-router-dom";

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "MM-0000";

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-white p-10 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div>
        <h1 className="mt-6 font-display text-4xl text-slate-950">Order placed successfully</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">Your Mega Mart order is now stored locally for demo purposes. Order reference: <span className="font-semibold text-slate-950">{orderNumber}</span>.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/products" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Continue shopping</Link>
          <Link to="/admin" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700">View in admin</Link>
        </div>
      </div>
    </div>
  );
}
