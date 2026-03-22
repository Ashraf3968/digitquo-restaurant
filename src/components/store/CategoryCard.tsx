import { Link } from "react-router-dom";
import type { Category } from "../../types";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className={`group flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br ${category.accent} p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1`}
    >
      <div className="mb-auto h-11 w-11 rounded-2xl bg-white/70" />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-950">{category.name}</h3>
        <p className="max-w-xs text-sm leading-6 text-slate-700">{category.shortDescription}</p>
        <span className="inline-flex pt-2 text-sm font-semibold text-emerald-800">Browse products</span>
      </div>
    </Link>
  );
}
