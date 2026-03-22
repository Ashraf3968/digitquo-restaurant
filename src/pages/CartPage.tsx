import { Link } from "react-router-dom";
import QuantitySelector from "../components/common/QuantitySelector";
import SectionHeading from "../components/common/SectionHeading";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const deliveryFee = items.length > 0 ? 2.99 : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Cart" title="Review your selected items before checkout" description="Adjust quantities, remove products, and confirm the order summary before entering delivery details." />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-[30px] bg-white p-8 text-center shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
              <div className="text-xl font-semibold text-slate-950">Your cart is empty</div>
              <p className="mt-3 text-sm text-slate-600">Browse the catalog to start building a realistic online supermarket order.</p>
              <Link to="/products" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Browse products</Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex flex-col gap-5 rounded-[30px] bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center">
                <img className="h-28 w-full rounded-[22px] object-cover sm:w-28" src={item.image} alt={item.name} />
                <div className="flex-1">
                  <div className="text-lg font-semibold text-slate-950">{item.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.unit}</div>
                  <div className="mt-3 text-base font-semibold text-slate-950">${item.price.toFixed(2)}</div>
                </div>
                <QuantitySelector value={item.quantity} onChange={(value) => updateQuantity(item.productId, value)} />
                <button type="button" className="text-sm font-semibold text-rose-600" onClick={() => removeItem(item.productId)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="h-fit rounded-[32px] bg-slate-950 p-7 text-white">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Order Summary</div>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex items-center justify-between"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold text-white"><span>Total</span><span>${(subtotal + deliveryFee).toFixed(2)}</span></div>
          </div>
          <Link to="/checkout" className="mt-8 inline-flex w-full justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
