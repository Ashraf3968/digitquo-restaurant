import { Link } from "react-router-dom";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import StarRating from "../components/common/StarRating";
import { faqItems, featuredDishes, galleryImages, highlights, siteMeta, testimonials, videoItems } from "../data/site";

const serviceMoments = [
  "Tasting menus guided by seasonal ingredients and fire-led techniques.",
  "Private dining experiences for corporate hosting and celebrations.",
  "Concierge-style reservations designed to convert from every screen size.",
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24 lg:pt-12 xl:gap-16">
        <MotionBlock className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700/80">Luxury Dining Experience</p>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-stone-900 sm:text-6xl lg:text-7xl">
            Light-filled dining with a refined fire-led menu.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            {siteMeta.tagline} Designed as a polished, trust-building restaurant website that feels worthy of a premium hospitality portfolio.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/reservations" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-stone-900/10 transition hover:-translate-y-0.5 hover:bg-stone-800">
              Book a Table
            </Link>
            <Link to="/menu" className="rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 transition hover:border-amber-300 hover:bg-amber-50">
              View Menu
            </Link>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["4.8/5", "Guest rating"],
              ["12K+", "Annual diners"],
              ["Private", "Event bookings"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.5rem] border border-white/70 bg-white/70 p-4 shadow-[0_18px_45px_rgba(221,210,192,0.35)] backdrop-blur">
                <div className="text-2xl font-semibold text-stone-900">{value}</div>
                <div className="mt-1 text-sm text-stone-500">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:max-w-xl">
            {serviceMoments.map((moment) => (
              <div key={moment} className="flex items-start gap-3 rounded-[1.35rem] bg-white/65 px-4 py-3 shadow-[0_16px_35px_rgba(221,210,192,0.22)]">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <p className="text-sm leading-7 text-stone-600">{moment}</p>
              </div>
            ))}
          </div>
        </MotionBlock>
        <MotionBlock delay={0.1} className="relative">
          <div className="absolute -left-6 top-8 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80"
            alt="Elegant restaurant dining room"
            className="h-full min-h-[420px] w-full rounded-[2rem] object-cover shadow-[0_35px_90px_rgba(212,187,156,0.45)] sm:min-h-[520px]"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-xl backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Signature ambiance</p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-stone-700">Soft natural light, sculpted interiors, and an atmosphere designed for memorable evenings.</p>
          </div>
        </MotionBlock>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <SectionIntro eyebrow="Featured Dishes" title="A menu presentation that feels editorial, rich, and beautifully commercial." description="Curated dish cards give restaurant owners a realistic preview of how premium food can be positioned online." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredDishes.map((dish, index) => (
            <MotionBlock key={dish.name} delay={index * 0.08} className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_22px_60px_rgba(221,210,192,0.35)] backdrop-blur">
              <img src={dish.image} alt={dish.name} className="h-72 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-lg font-semibold text-stone-900">{dish.name}</p>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">{dish.tag}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-600">{dish.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold text-stone-900">{dish.price}</span>
                  <Link to="/menu" className="text-sm font-semibold text-stone-900 transition hover:text-amber-700">See full menu</Link>
                </div>
              </div>
            </MotionBlock>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-10 rounded-[2.5rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_80px_rgba(221,210,192,0.4)] backdrop-blur lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <MotionBlock>
            <SectionIntro eyebrow="About Maison Ember" title="Built around calm luxury, quality ingredients, and impeccable hospitality." description="This concept showcases how an agency-grade website can balance beautiful storytelling with strong booking-focused UX." />
            <Link to="/about" className="mt-8 inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-amber-300 hover:bg-amber-50">Discover our story</Link>
          </MotionBlock>
          <MotionBlock delay={0.08} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] bg-stone-50 p-5">
                <h3 className="text-lg font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.text}</p>
              </div>
            ))}
          </MotionBlock>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <SectionIntro eyebrow="Testimonials" title="Social proof that feels polished, trustworthy, and conversion-ready." description="Premium review cards help potential guests and clients feel immediate confidence in the restaurant brand." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <MotionBlock key={testimonial.name} delay={index * 0.08} className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_55px_rgba(221,210,192,0.32)]">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-amber-100 text-sm font-semibold text-amber-800">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-stone-900">{testimonial.name}</p>
                  <p className="text-sm text-stone-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-stone-600">{testimonial.quote}</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <StarRating rating={testimonial.rating} size="sm" />
                <Link to="/reviews" className="text-sm font-semibold text-stone-900 transition hover:text-amber-700">Read all reviews</Link>
              </div>
            </MotionBlock>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <SectionIntro eyebrow="Experience" title="Immersive video moments to showcase ambiance, craft, and hospitality." description="Use these premium cards to present reels, kitchen footage, or private dining moments in a portfolio-ready way." />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {videoItems.map((video, index) => (
            <MotionBlock key={video.title} delay={index * 0.08} className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_18px_55px_rgba(221,210,192,0.32)]">
              <div className="relative">
                <img src={video.image} alt={video.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/65 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-white">
                  <div>
                    <p className="font-semibold">{video.title}</p>
                    <p className="text-sm text-white/80">{video.duration}</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/20 backdrop-blur">Play</div>
                </div>
              </div>
              <div className="p-6 text-sm leading-7 text-stone-600">{video.description}</div>
            </MotionBlock>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <SectionIntro eyebrow="Gallery" title="A refined visual stream of cuisine, interiors, and private dining moments." description="The grid is designed to feel spacious and portfolio-worthy on desktop while staying clean and touch-friendly on mobile." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <MotionBlock key={image} delay={index * 0.04} className="overflow-hidden rounded-[2rem]">
              <img src={image} alt={`Gallery ${index + 1}`} className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
            </MotionBlock>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="rounded-[2.5rem] bg-stone-900 px-6 py-12 text-white lg:flex lg:items-center lg:justify-between lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">Reservation CTA</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Turn interest into bookings with a clear, elegant reservation journey.</h2>
            <p className="mt-4 text-base leading-8 text-white/70">Strategically placed call-to-actions keep the experience polished while improving conversion across mobile and desktop.</p>
          </div>
          <Link to="/reservations" className="mt-8 inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 lg:mt-0">Reserve a table</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <SectionIntro eyebrow="FAQ" title="Answer common questions without interrupting the premium feel of the site." description="A simple, elegant FAQ helps move visitors toward reservations, private dining, or contact inquiries." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqItems.map((faq, index) => (
            <MotionBlock key={faq.question} delay={index * 0.05} className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_50px_rgba(221,210,192,0.28)]">
              <h3 className="text-lg font-semibold text-stone-900">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
            </MotionBlock>
          ))}
        </div>
      </section>
    </>
  );
}
