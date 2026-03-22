import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuantitySelector from "../components/common/QuantitySelector";
import RatingStars from "../components/common/RatingStars";
import ProductCard from "../components/store/ProductCard";
import { useCart } from "../context/CartContext";
import { createReview, getProductBySlug, getProductReviews, getRelatedProducts } from "../lib/api";
import type { Product, Review } from "../types";

export default function ProductDetailsPage() {
  const { slug = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [feedback, setFeedback] = useState("");
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    void getProductBySlug(slug).then(async (nextProduct) => {
      setProduct(nextProduct);
      if (!nextProduct) {
        return;
      }

      const [nextReviews, nextRelated] = await Promise.all([
        getProductReviews(nextProduct.id),
        getRelatedProducts(nextProduct.categoryId, nextProduct.id),
      ]);

      setSelectedImage(nextProduct.gallery[0] ?? nextProduct.image);
      setReviews(nextReviews);
      setRelated(nextRelated);
    });
  }, [slug]);

  if (!product) {
    return <div className="mx-auto max-w-5xl px-4 py-24 text-center text-slate-500">Product not found.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
        <div className="space-y-5">
          <div className="overflow-hidden rounded-[36px] bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <img className="h-[520px] w-full object-cover" src={selectedImage || product.image} alt={product.name} />
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            {product.gallery.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                className={`overflow-hidden rounded-[24px] border bg-white ${selectedImage === image ? "border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" : "border-slate-200"}`}
                onClick={() => setSelectedImage(image)}
              >
                <img className="h-28 w-full object-cover" src={image} alt={`${product.name} gallery ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-[36px] bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">{product.tag}</span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{product.stockStatus}</span>
          </div>
          <div className="space-y-3">
            <div className="text-sm uppercase tracking-[0.24em] text-slate-500">{product.categoryName}</div>
            <h1 className="font-display text-4xl text-slate-950">{product.name}</h1>
            <p className="text-base leading-8 text-slate-600">{product.description}</p>
          </div>
          <RatingStars rating={product.rating} count={product.reviewCount} />
          <div className="flex items-end gap-4">
            <div className="text-4xl font-semibold text-slate-950">${product.price.toFixed(2)}</div>
            {product.oldPrice ? <div className="pb-1 text-lg text-slate-400 line-through">${product.oldPrice.toFixed(2)}</div> : null}
          </div>
          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="rounded-[24px] bg-slate-50 p-4">SKU: {product.sku}</div>
            <div className="rounded-[24px] bg-slate-50 p-4">Brand: {product.brand}</div>
            <div className="rounded-[24px] bg-slate-50 p-4">Pack size: {product.unit}</div>
            <div className="rounded-[24px] bg-slate-50 p-4">Available stock: {product.stockCount}</div>
          </div>
          <div className="space-y-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => addItem(product, quantity)} className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                  navigate("/checkout");
                }}
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Product highlights</div>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-600">
              {product.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[36px] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Customer Reviews</div>
            <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Average rating <span className="font-semibold text-slate-950">{product.rating.toFixed(1)}</span> from {product.reviewCount} reviews
            </div>
          </div>
          <div className="mt-6 space-y-5">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-[24px] border border-slate-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-950">{review.name}</div>
                    <div className="text-sm text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="text-amber-500">{"★".repeat(review.rating)}</div>
                </div>
                <div className="mt-4 text-base font-semibold text-slate-950">{review.title}</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] bg-slate-950 p-8 text-white">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Leave a Review</div>
          <form
            className="mt-6 space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);

              await createReview({
                productId: product.id,
                name: String(formData.get("name") ?? ""),
                rating: Number(formData.get("rating") ?? 5),
                title: String(formData.get("title") ?? ""),
                text: String(formData.get("text") ?? ""),
              });

              setFeedback("Review submitted successfully.");
              setReviews(await getProductReviews(product.id));
              event.currentTarget.reset();
            }}
          >
            <input name="name" required className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="Your name" />
            <input name="title" required className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="Review title" />
            <select name="rating" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none">
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>{value} stars</option>
              ))}
            </select>
            <textarea name="text" required rows={5} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="Tell other customers about the product." />
            <button type="submit" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white">Submit Review</button>
            {feedback ? <div className="text-sm text-emerald-200">{feedback}</div> : null}
          </form>
          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            Need help before ordering? Contact support or use WhatsApp for quick assistance on stock, delivery, and bulk quantities.
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Related products</div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">More from {product.categoryName}</div>
          </div>
          <Link to="/products" className="text-sm font-semibold text-emerald-700">Browse all products</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} onAddToCart={(nextProduct) => addItem(nextProduct, 1)} />
          ))}
        </div>
      </section>
    </div>
  );
}
