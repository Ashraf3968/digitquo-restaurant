import { useMemo, useState } from "react";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { menuItems } from "../data/site";

const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredItems = useMemo(
    () => (activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <SectionIntro eyebrow="Menu" title="A high-end menu layout designed to feel clear, appetizing, and premium." description="Categories, tags, and elegant dish cards make the menu easy to scan while preserving an upscale brand feel." />
      <div className="mt-10 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category ? "bg-stone-900 text-white" : "border border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-amber-50"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {filteredItems.map((item, index) => (
          <MotionBlock key={`${item.name}-${item.category}`} delay={index * 0.04} className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_20px_55px_rgba(221,210,192,0.3)] sm:grid-cols-[180px_1fr]">
            <img src={item.image} alt={item.name} className="h-48 w-full rounded-[1.5rem] object-cover sm:h-full" />
            <div className="flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700/80">{item.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-stone-900">{item.name}</h3>
                </div>
                <span className="text-lg font-semibold text-stone-900">{item.price}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-600">{item.description}</p>
              <div className="mt-auto pt-5">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{item.tag}</span>
              </div>
            </div>
          </MotionBlock>
        ))}
      </div>
    </section>
  );
}

