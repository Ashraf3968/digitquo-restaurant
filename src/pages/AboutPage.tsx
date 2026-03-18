import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { storyMoments } from "../data/site";

const detailCards = [
  ["Our mission", "To create a dining experience that feels composed, seasonal, and deeply welcoming from arrival to final course."],
  ["Quality ingredients", "From premium seafood to produce-led seasonal plates, ingredients drive the story behind every menu change."],
  ["Meet the chef", "Chef Elena Moretti leads the kitchen with modern restraint, warmth, and precision shaped by European fine dining."],
];

const pillars = [
  "Fresh local produce and carefully sourced premium proteins.",
  "A bright, modern dining room with private dining capability.",
  "Service designed to feel attentive, elegant, and never rushed.",
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <SectionIntro eyebrow="About Us" title="A bright, elevated restaurant concept shaped by detail and hospitality." description="This page balances trust-building storytelling, chef identity, ingredient quality, and a premium hospitality atmosphere." />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <MotionBlock className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.35)] sm:p-8">
          {storyMoments.map((moment) => (
            <p key={moment} className="mb-6 text-base leading-8 text-stone-600 last:mb-0">{moment}</p>
          ))}
          <div className="mt-8 grid gap-3">
            {pillars.map((pillar) => (
              <div key={pillar} className="flex items-start gap-3 rounded-[1.35rem] bg-stone-50 px-4 py-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <p className="text-sm leading-7 text-stone-600">{pillar}</p>
              </div>
            ))}
          </div>
        </MotionBlock>

        <MotionBlock delay={0.08} className="grid gap-6 sm:grid-cols-2">
          <img className="h-full min-h-[260px] rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80" alt="Chef preparing food" />
          <img className="h-full min-h-[260px] rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" alt="Restaurant interior" />
          <img className="h-full min-h-[260px] rounded-[2rem] object-cover sm:col-span-2" src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80" alt="Private dining room" />
        </MotionBlock>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {detailCards.map(([title, text], index) => (
          <MotionBlock key={title} delay={index * 0.06} className="rounded-[2rem] bg-white/80 p-6 shadow-[0_18px_45px_rgba(221,210,192,0.3)]">
            <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
          </MotionBlock>
        ))}
      </div>
    </section>
  );
}
