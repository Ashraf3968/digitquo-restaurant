import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CategoryCard from "../components/store/CategoryCard";
import ProductCard from "../components/store/ProductCard";
import SectionHeading from "../components/common/SectionHeading";
import { useCart } from "../context/CartContext";
import { createInitialStore } from "../data/seed";

const store = createInitialStore();

export default function HomePage() {
  const { addItem } = useCart();
  const featured = store.products.filter((product) => product.isFeatured).slice(0, 8);
  const newArrivals = store.products.filter((product) => product.isNewArrival).slice(0, 4);
  const offers = store.products.filter((product) => product.isDiscounted).slice(0, 4);

  return (
    <div className="pb-24">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="space-y-8 rounded-[36px] bg-slate-950 px-8 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)] md:px-10 md:py-12">
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
            Premium Family Retail
          </div>
          <div className="space-y-5">
            <h1 className="font-display max-w-2xl text-5xl leading-tight md:text-6xl">
              Modern supermarket shopping with polished delivery-first convenience.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Mega Mart brings fresh groceries, pantry staples, household essentials, and premium everyday products into one enterprise-grade retail experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/products" className="rounded-full bg-emerald-500 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-400">
              Shop Now
            </Link>
            <Link to="/categories" className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10">
              Browse Categories
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["60+", "Realistic products"],
              ["Same-day", "Priority delivery"],
              ["4.8/5", "Customer satisfaction"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-semibold">{value}</div>
                <div className="mt-2 text-sm text-slate-300">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }} className="grid gap-6">
          <div className="overflow-hidden rounded-[36px] border border-white/60 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <img className="h-[320px] w-full object-cover" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" alt="Mega Mart hero" />
            <div className="space-y-4 p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">This Week</div>
                  <div className="mt-2 text-2xl font-semibold text-slate-950">Fresh produce, bakery, and family bundles</div>
                </div>
                <div className="rounded-3xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-700">Up to 25% off</div>
              </div>
              <p className="text-sm leading-7 text-slate-600">Seasonal produce, breakfast staples, and curated home essentials selected for fast local delivery and polished in-store collection.</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Support</div>
              <div className="mt-3 text-2xl font-semibold text-slate-950">Call, WhatsApp, or message us in minutes</div>
              <div className="mt-4 text-sm leading-7 text-slate-600">Live service for delivery support, bulk orders, and product availability.</div>
            </div>
            <div className="rounded-[30px] bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-[0_18px_60px_rgba(16,185,129,0.28)]">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">Opening Hours</div>
              <div className="mt-3 text-2xl font-semibold">Monday - Saturday</div>
              <div className="mt-1 text-emerald-100">8:00 AM - 10:00 PM</div>
              <div className="mt-4 border-t border-white/20 pt-4 text-sm text-emerald-50">Sunday: 9:00 AM - 8:00 PM</div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Categories" title="Shop the departments customers return to every week" description="A complete supermarket mix designed around daily-use products, family convenience, and a strong premium retail presentation." />
        <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">
          {store.categories.slice(0, 10).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Bestsellers" title="Top-moving products across fresh, pantry, and household aisles" description="High-converting essentials with premium imagery, realistic pricing, and a strong supermarket card layout." />
          <Link to="/products" className="text-sm font-semibold text-emerald-700">View full catalog</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={(item) => addItem(item, 1)} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-[36px] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
          <SectionHeading eyebrow="Why Mega Mart" title="Built around trust, speed, and real-world retail quality" description="Every section is designed to feel like a commercial platform: polished hierarchy, clear service cues, and friction-light ordering." />
          <div className="mt-8 grid gap-5">
            {[
              ["Freshness controlled", "Temperature-managed packing for produce, dairy, and frozen goods."],
              ["Enterprise-grade service", "Support coverage for consumers, offices, and high-frequency household ordering."],
              ["Reliable convenience", "Search, filters, cart, and checkout optimized for mobile-first grocery behavior."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] border border-slate-200 p-5">
                <div className="text-lg font-semibold text-slate-950">{title}</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={(item) => addItem(item, 1)} />
            ))}
          </div>
          <div className="rounded-[36px] bg-slate-950 p-8 text-white">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Media & Highlights</div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {store.media.map((media) => (
                <div key={media.id} className="overflow-hidden rounded-[26px] border border-white/10 bg-white/5">
                  <img className="h-44 w-full object-cover" src={media.thumbnail} alt={media.title} />
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold">{media.title}</div>
                      <div className="text-xs text-emerald-200">{media.duration}</div>
                    </div>
                    <div className="text-sm leading-6 text-slate-300">{media.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Offers" title="Promotions that feel like a real weekly retail campaign" description="Discounted products surfaced with strong visual hierarchy and a clean commercial card system." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {offers.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={(item) => addItem(item, 1)} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {store.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <div className="text-amber-500">{"★".repeat(testimonial.rating)}</div>
              <p className="mt-4 text-base leading-8 text-slate-700">“{testimonial.quote}”</p>
              <div className="mt-6 text-sm font-semibold text-slate-950">{testimonial.name}</div>
              <div className="text-sm text-slate-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
