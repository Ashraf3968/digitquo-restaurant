import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "megamart-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem: (product, quantity) => {
          setItems((current) => {
            const existing = current.find((item) => item.productId === product.id);
            if (existing) {
              return current.map((item) =>
                item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
              );
            }
            return [
              ...current,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
                unit: product.unit,
              },
            ];
          });
        },
        updateQuantity: (productId, quantity) => {
          setItems((current) =>
            current.flatMap((item) => {
              if (item.productId !== productId) {
                return item;
              }
              if (quantity <= 0) {
                return [];
              }
              return { ...item, quantity };
            })
          );
        },
        removeItem: (productId) => setItems((current) => current.filter((item) => item.productId !== productId)),
        clearCart: () => setItems([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
