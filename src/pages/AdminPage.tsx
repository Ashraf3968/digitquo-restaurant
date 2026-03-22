import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createCategory, createOrUpdateProduct, deleteProduct, getAdminDashboard, resetStore, updateOrderStatus } from "../lib/api";
import type { Category, Order, Product, Review, SupportInquiry } from "../types";

type DashboardState = {
  categories: Category[];
  products: Product[];
  reviews: Review[];
  inquiries: SupportInquiry[];
  orders: Order[];
  users: Array<{ id: string; name: string; email: string; role: string }>;
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    pendingOrders: number;
    lowStockProducts: number;
    averageRating: number;
  };
};

const emptyDraft = {
  id: "",
  name: "",
  slug: "",
  categoryId: "",
  categoryName: "",
  brand: "",
  unit: "",
  price: "0",
  oldPrice: "",
  shortDescription: "",
  description: "",
  image: "",
  stockCount: "10",
  tag: "New",
};

export default function AdminPage() {
  const { isAdmin, user } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [draft, setDraft] = useState(emptyDraft);
  const [message, setMessage] = useState("");

  const loadDashboard = async () => {
    const next = await getAdminDashboard();
    setDashboard(next as DashboardState);
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  if (!user || !isAdmin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="rounded-[36px] bg-white p-10 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Admin Login</div>
          <h1 className="mt-4 font-display text-4xl text-slate-950">Restricted admin area</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">Sign in with `admin@megamart.com` and password `admin123` to access the dashboard.</p>
          <Link to="/login" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Go to login</Link>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return <div className="px-4 py-24 text-center text-slate-500">Loading admin dashboard...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[32px] bg-slate-950 p-6 text-white">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Admin Panel</div>
          <div className="mt-4 text-2xl font-semibold">{user.name}</div>
          <div className="mt-1 text-sm text-slate-300">{user.email}</div>
          <div className="mt-8 grid gap-3 text-sm">
            {["Overview", "Products", "Categories", "Orders", "Reviews", "Inquiries"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</div>
            ))}
          </div>
          <button
            type="button"
            className="mt-8 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
            onClick={() => {
              resetStore();
              void loadDashboard();
              setMessage("Store reset to seeded local data.");
            }}
          >
            Reset demo data
          </button>
        </aside>

        <div className="space-y-8">
          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
            {[
              ["Revenue", `$${dashboard.metrics.totalRevenue.toFixed(2)}`],
              ["Orders", String(dashboard.metrics.totalOrders)],
              ["Customers", String(dashboard.metrics.totalCustomers)],
              ["Pending", String(dashboard.metrics.pendingOrders)],
              ["Low stock", String(dashboard.metrics.lowStockProducts)],
              ["Avg rating", dashboard.metrics.averageRating.toFixed(1)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[28px] bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                <div className="text-sm uppercase tracking-[0.24em] text-slate-500">{label}</div>
                <div className="mt-3 text-3xl font-semibold text-slate-950">{value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-950">Product management</h2>
                  <div className="text-sm text-slate-500">{dashboard.products.length} products</div>
                </div>
                <form
                  className="mt-6 grid gap-4 md:grid-cols-2"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    const category = dashboard.categories.find((item) => item.id === draft.categoryId) ?? dashboard.categories[0];
                    const product: Product = {
                      id: draft.id || `product-${Date.now()}`,
                      slug: draft.slug || draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
                      name: draft.name,
                      categoryId: category.id,
                      categoryName: category.name,
                      brand: draft.brand,
                      unit: draft.unit,
                      price: Number(draft.price),
                      oldPrice: draft.oldPrice ? Number(draft.oldPrice) : null,
                      shortDescription: draft.shortDescription,
                      description: draft.description,
                      features: ["Admin managed", "Local demo data", "Portfolio-ready catalog"],
                      image: draft.image,
                      gallery: [draft.image, draft.image, draft.image],
                      stockStatus: Number(draft.stockCount) < 15 ? "Low Stock" : "In Stock",
                      stockCount: Number(draft.stockCount),
                      rating: 4.7,
                      reviewCount: 24,
                      sku: `${category.slug.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-3)}`,
                      tag: draft.tag as Product["tag"],
                      isFeatured: true,
                      isNewArrival: draft.tag === "New",
                      isBestSeller: draft.tag === "Bestseller",
                      isDiscounted: Boolean(draft.oldPrice),
                      popularity: 75,
                      createdAt: new Date().toISOString(),
                    };
                    await createOrUpdateProduct(product);
                    setDraft(emptyDraft);
                    setMessage("Product saved.");
                    await loadDashboard();
                  }}
                >
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Product name" value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} />
                  <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" value={draft.categoryId} onChange={(event) => setDraft((current) => ({ ...current, categoryId: event.target.value }))}>
                    <option value="">Select category</option>
                    {dashboard.categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Brand" value={draft.brand} onChange={(event) => setDraft((current) => ({ ...current, brand: event.target.value }))} />
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Unit" value={draft.unit} onChange={(event) => setDraft((current) => ({ ...current, unit: event.target.value }))} />
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Price" value={draft.price} onChange={(event) => setDraft((current) => ({ ...current, price: event.target.value }))} />
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Old price" value={draft.oldPrice} onChange={(event) => setDraft((current) => ({ ...current, oldPrice: event.target.value }))} />
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" placeholder="Image URL" value={draft.image} onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))} />
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" placeholder="Short description" value={draft.shortDescription} onChange={(event) => setDraft((current) => ({ ...current, shortDescription: event.target.value }))} />
                  <textarea className="rounded-2xl border border-slate-200 px-4 py-3 text-sm md:col-span-2" rows={4} placeholder="Description" value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} />
                  <input className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Stock count" value={draft.stockCount} onChange={(event) => setDraft((current) => ({ ...current, stockCount: event.target.value }))} />
                  <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" value={draft.tag} onChange={(event) => setDraft((current) => ({ ...current, tag: event.target.value }))}>
                    {["New", "Bestseller", "Discount", "Popular"].map((tag) => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <button type="submit" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white md:col-span-2">Save product</button>
                </form>
                <div className="mt-6 max-h-[360px] space-y-3 overflow-auto">
                  {dashboard.products.slice(0, 8).map((product) => (
                    <div key={product.id} className="flex items-center justify-between gap-4 rounded-[22px] border border-slate-200 p-4">
                      <div>
                        <div className="font-semibold text-slate-950">{product.name}</div>
                        <div className="text-sm text-slate-500">{product.categoryName} · ${product.price.toFixed(2)}</div>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="rounded-full border border-slate-200 px-3 py-2 text-sm" onClick={() => setDraft({ ...draft, id: product.id, name: product.name, slug: product.slug, categoryId: product.categoryId, categoryName: product.categoryName, brand: product.brand, unit: product.unit, price: String(product.price), oldPrice: product.oldPrice ? String(product.oldPrice) : "", shortDescription: product.shortDescription, description: product.description, image: product.image, stockCount: String(product.stockCount), tag: product.tag })}>Edit</button>
                        <button type="button" className="rounded-full border border-rose-200 px-3 py-2 text-sm text-rose-600" onClick={async () => { await deleteProduct(product.id); setMessage("Product deleted."); await loadDashboard(); }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-950">Orders list</h2>
                  <div className="text-sm text-slate-500">{dashboard.orders.length} total orders</div>
                </div>
                <div className="mt-6 space-y-3">
                  {dashboard.orders.map((order) => (
                    <div key={order.id} className="rounded-[22px] border border-slate-200 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="font-semibold text-slate-950">{order.orderNumber}</div>
                          <div className="text-sm text-slate-500">{order.customerName} · ${order.total.toFixed(2)}</div>
                        </div>
                        <select className="rounded-full border border-slate-200 px-3 py-2 text-sm" value={order.status} onChange={async (event) => { await updateOrderStatus(order.id, event.target.value as Order["status"]); await loadDashboard(); }}>
                          {["Pending", "Confirmed", "Packed", "Out for Delivery", "Delivered"].map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                <h2 className="text-xl font-semibold text-slate-950">Category management</h2>
                <form
                  className="mt-5 space-y-3"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    await createCategory({
                      slug: String(formData.get("slug") ?? ""),
                      name: String(formData.get("name") ?? ""),
                      description: String(formData.get("description") ?? ""),
                      shortDescription: String(formData.get("shortDescription") ?? ""),
                      accent: "from-emerald-200 via-cyan-100 to-white",
                      heroImage: String(formData.get("heroImage") ?? ""),
                      icon: "Grid",
                    });
                    setMessage("Category created.");
                    event.currentTarget.reset();
                    await loadDashboard();
                  }}
                >
                  <input name="name" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Category name" />
                  <input name="slug" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Category slug" />
                  <input name="heroImage" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Category image URL" />
                  <input name="shortDescription" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Short description" />
                  <textarea name="description" required rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" placeholder="Description" />
                  <button type="submit" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Add category</button>
                </form>
                <div className="mt-6 grid gap-2">
                  {dashboard.categories.map((category) => (
                    <div key={category.id} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{category.name}</div>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                <h2 className="text-xl font-semibold text-slate-950">Customer reviews</h2>
                <div className="mt-5 space-y-3">
                  {dashboard.reviews.slice(0, 6).map((review) => (
                    <div key={review.id} className="rounded-[22px] border border-slate-200 p-4">
                      <div className="font-semibold text-slate-950">{review.title}</div>
                      <div className="mt-1 text-sm text-slate-500">{review.name} · {review.rating} stars</div>
                      <div className="mt-2 text-sm leading-7 text-slate-600">{review.text}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                <h2 className="text-xl font-semibold text-slate-950">Contact inquiries</h2>
                <div className="mt-5 space-y-3">
                  {dashboard.inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="rounded-[22px] border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-slate-950">{inquiry.subject}</div>
                        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{inquiry.status}</div>
                      </div>
                      <div className="mt-1 text-sm text-slate-500">{inquiry.name} · {inquiry.type}</div>
                      <div className="mt-2 text-sm leading-7 text-slate-600">{inquiry.message}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
          {message ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
        </div>
      </div>
    </div>
  );
}
