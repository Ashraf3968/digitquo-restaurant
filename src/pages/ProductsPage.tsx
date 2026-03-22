import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/store/ProductCard";
import SectionHeading from "../components/common/SectionHeading";
import { useCart } from "../context/CartContext";
import { getCategories, getProducts } from "../lib/api";
import type { Category, Product } from "../types";

const pageSize = 12;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const { addItem } = useCart();

  const categoryFilter = searchParams.get("category") ?? "all";
  const sortBy = searchParams.get("sort") ?? "popular";
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    void Promise.all([getProducts(), getCategories()]).then(([nextProducts, nextCategories]) => {
      setProducts(nextProducts);
      setCategories(nextCategories);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    const next = products.filter((product) => {
      const matchesCategory = categoryFilter === "all" || product.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categoryFilter || product.categoryId === categoryFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.categoryName.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    return [...next].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.popularity - a.popularity;
    });
  }, [categoryFilter, products, query, sortBy]);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [categoryFilter, sortBy, query]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Products" title="Search, sort, and filter the complete Mega Mart catalog" description="A responsive retail grid with category controls, search, sorting, and realistic seeded product data across 15 departments." />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Search</div>
            <input
              className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400"
              placeholder="Search products or brands"
              value={query}
              onChange={(event) => updateParam("q", event.target.value)}
            />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Categories</div>
            <div className="mt-4 grid gap-2">
              <button type="button" onClick={() => updateParam("category", "all")} className={`rounded-2xl px-4 py-3 text-left text-sm ${categoryFilter === "all" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}>
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => updateParam("category", category.slug)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm ${categoryFilter === category.slug ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Sort</div>
            <select className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" value={sortBy} onChange={(event) => updateParam("sort", event.target.value)}>
              <option value="popular">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 rounded-[30px] bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Catalog View</div>
              <div className="mt-1 text-lg font-semibold text-slate-950">{filteredProducts.length} products matched your filters</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Fresh produce", "Weekly staples", "Household care", "Fast delivery"].map((chip) => (
                <span key={chip} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{chip}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={(item) => addItem(item, 1)} />
            ))}
          </div>
          {visibleCount < filteredProducts.length ? (
            <div className="flex justify-center">
              <button type="button" onClick={() => setVisibleCount((count) => count + pageSize)} className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
