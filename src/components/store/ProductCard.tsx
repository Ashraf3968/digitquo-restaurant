import { Link } from "react-router-dom";
import type { Product } from "../../types";
import RatingStars from "../common/RatingStars";

export default function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart?: (product: Product) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)]">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden">
        <img className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" src={product.image} alt={product.name} />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{product.categoryName}</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{product.tag}</span>
        </div>
        <div className="space-y-2">
          <Link to={`/products/${product.slug}`} className="block text-lg font-semibold text-slate-950 hover:text-emerald-700">
            {product.name}
          </Link>
          <p className="text-sm leading-6 text-slate-600">{product.shortDescription}</p>
        </div>
        <RatingStars rating={product.rating} count={product.reviewCount} compact />
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xl font-semibold text-slate-950">${product.price.toFixed(2)}</div>
            {product.oldPrice ? <div className="text-sm text-slate-400 line-through">${product.oldPrice.toFixed(2)}</div> : null}
          </div>
          {onAddToCart ? (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Add to Cart
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
