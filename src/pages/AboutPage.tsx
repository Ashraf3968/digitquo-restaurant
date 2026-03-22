import SectionHeading from "../components/common/SectionHeading";
import { createInitialStore } from "../data/seed";

const store = createInitialStore();

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <SectionHeading eyebrow="About Mega Mart" title="A premium supermarket brand built around dependable daily convenience" description="Mega Mart is positioned as a trusted urban retail destination blending fresh food, household essentials, and seamless digital ordering into one polished experience." />
          <div className="grid gap-4">
            {[
              ["Our story", "Mega Mart began as a modern neighborhood retail concept focused on premium presentation, broad category coverage, and service-first operations."],
              ["Mission", "Deliver reliable quality across groceries, fresh produce, personal care, household essentials, and convenience categories in one easy order flow."],
              ["Vision", "Set a higher standard for supermarket UX by making local retail feel organized, premium, and technology-forward."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">
                <div className="text-lg font-semibold text-slate-950">{title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[36px] border border-white/60 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <img className="h-full min-h-[420px] w-full object-cover" src="https://images.unsplash.com/photo-1604719312566-8912e9c8a213?auto=format&fit=crop&w=1200&q=80" alt="Mega Mart interior" />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["Why customers trust us", "Curated product mix, clear pricing, premium service cues, and a clean enterprise-grade presentation."],
          ["Quality promise", "Fresh categories are handled with care, and pantry, wellness, and home products are selected for consistency and reliability."],
          ["Delivery & service", "Fast local dispatch, helpful contact channels, and easy online order handling built for real-world household shopping."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-[30px] bg-slate-950 p-7 text-white">
            <div className="text-xl font-semibold">{title}</div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[36px] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <SectionHeading eyebrow="Store Scope" title="Fifteen live retail categories seeded for realistic portfolio presentation" description="The catalog covers all the departments expected from a true Mega Mart business, including groceries, produce, dairy, beverages, snacks, baby care, frozen foods, and more." />
        <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {store.categories.map((category) => (
            <div key={category.id} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
              {category.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
