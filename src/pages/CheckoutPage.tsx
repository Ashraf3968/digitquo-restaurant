import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import { useCart } from "../context/CartContext";
import { createOrder } from "../lib/api";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const deliveryFee = items.length > 0 ? 2.99 : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Checkout" title="Delivery details and payment mockup" description="A polished order form with realistic delivery fields and a local mock payment selection for showcase-ready checkout UX." />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          className="space-y-6 rounded-[32px] bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.05)]"
          onSubmit={async (event) => {
            event.preventDefault();
            if (items.length === 0) {
              setMessage("Add products before placing an order.");
              return;
            }
            const formData = new FormData(event.currentTarget);
            const order = await createOrder({
              customerName: String(formData.get("customerName") ?? ""),
              email: String(formData.get("email") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              address: String(formData.get("address") ?? ""),
              city: String(formData.get("city") ?? ""),
              notes: String(formData.get("notes") ?? ""),
              paymentMethod: String(formData.get("paymentMethod") ?? "Cash on Delivery") as "Cash on Delivery" | "Card on Delivery" | "Wallet",
              items: items.map((item) => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                unitPrice: item.price,
                image: item.image,
              })),
              subtotal,
              deliveryFee,
              total: Number((subtotal + deliveryFee).toFixed(2)),
            });
            clearCart();
            navigate(`/order-success?order=${order.orderNumber}`);
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="customerName" required className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Full name" />
            <input name="email" required className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Email address" />
            <input name="phone" required className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Phone number" />
            <input name="city" required className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="City" />
          </div>
          <input name="address" required className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Delivery address" />
          <textarea name="notes" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400" placeholder="Gate code, landmark, or delivery notes" />
          <div className="grid gap-3 md:grid-cols-3">
            {["Cash on Delivery", "Card on Delivery", "Wallet"].map((method) => (
              <label key={method} className="rounded-[24px] border border-slate-200 p-4 text-sm text-slate-700">
                <input type="radio" name="paymentMethod" value={method} defaultChecked={method === "Cash on Delivery"} className="mr-2" />
                {method}
              </label>
            ))}
          </div>
          <button type="submit" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Place Order</button>
          {message ? <div className="text-sm text-rose-600">{message}</div> : null}
        </form>

        <div className="rounded-[32px] bg-slate-950 p-7 text-white">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Final Summary</div>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-3">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/10 pt-4"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex items-center justify-between"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="flex items-center justify-between text-base font-semibold text-white"><span>Total</span><span>${(subtotal + deliveryFee).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
