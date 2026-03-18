import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import { storyMoments } from "../data/site";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <SectionIntro eyebrow="About Us" title="A bright, elevated restaurant concept shaped by detail and hospitality." description="This page balances trust-building storytelling, chef identity, ingredient quality, and a premium hospitality atmosphere." />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <MotionBlock className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_70px_rgba(221,210,192,0.35)]">
          {storyMoments.map((moment) => (
            <p key={moment} className="mb-6 text-base leading-8 text-stone-600 last:mb-0">{moment}</p>
          ))}
        </MotionBlock>
        <MotionBlock delay={0.08} className="grid gap-6 sm:grid-cols-2">
          <img className="h-full min-h-[260px] rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80" alt="Chef preparing food" />
          <img className="h-full min-h-[260px] rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" alt="Restaurant interior" />
        </MotionBlock>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          ["Our mission", "To create a dining experience that feels composed, seasonal, and deeply welcoming."],
          ["Quality ingredients", "From premium seafood to produce-led seasonal plates, ingredients drive the story."],
          ["Meet the chef", "Chef Elena Moretti leads the menu with modern restraint, warmth, and precision."],
        ].map(([title, text], index) => (
          <MotionBlock key={title} delay={index * 0.06} className="rounded-[2rem] bg-white/80 p-6 shadow-[0_18px_45px_rgba(221,210,192,0.3)]">
            <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">{text}</p>
          </MotionBlock>
        ))}
      </div>
    </section>
  );
}

