import { useState } from "react";
import type { FormEvent } from "react";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import StarRating from "../components/common/StarRating";
import { testimonials } from "../data/site";

const reviewHighlights = [
  { label: "Repeat bookings", value: "86%" },
  { label: "Private event satisfaction", value: "4.9/5" },
  { label: "Service and ambiance", value: "Top rated" },
];

export default function ReviewsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section className="mx-auto max-w-[92rem] px-4 py-12 sm:px-6 xl:px-8 2xl:px-10 lg:py-16">
      <SectionIntro
        eyebrow="Reviews"
        title="Trust-building testimonials with a premium, editorial layout."
        description="This page combines an average rating summary, review cards, guest sentiment highlights, and a clean leave-a-review form to feel like a real commercial hospitality site."
        align="center"
      />

      <MotionBlock className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_55px_rgba(221,210,192,0.3)] sm:p-8">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Average rating</p>
            <p className="mt-3 text-5xl font-semibold text-stone-900">4.8/5</p>
            <StarRating rating={5} className="mt-4 justify-center md:justify-start" />
            <p className="mt-3 text-stone-600">Based on guest feedback, private events, and recurring reservations.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
            {reviewHighlights.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] bg-stone-50 p-4 text-center md:text-left">
                <p className="text-lg font-semibold text-stone-900">{item.value}</p>
                <p className="mt-1 text-sm text-stone-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionBlock>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <MotionBlock key={testimonial.name} delay={index * 0.08} className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_55px_rgba(221,210,192,0.3)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-stone-900 text-sm font-semibold text-white">{testimonial.avatar}</div>
              <div>
                <p className="font-semibold text-stone-900">{testimonial.name}</p>
                <p className="text-sm text-stone-500">Verified guest · {testimonial.role}</p>
              </div>
            </div>
            <StarRating rating={testimonial.rating} className="mt-5" />
            <p className="mt-4 text-sm leading-7 text-stone-600">{testimonial.quote}</p>
          </MotionBlock>
        ))}
      </div>

      <MotionBlock className="mt-12 rounded-[2.25rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-8">
        <SectionIntro
          eyebrow="Leave a Review"
          title="Invite guests to share polished, trust-building feedback."
          description="A professional review form improves credibility and adds a realistic conversion layer to the demo."
        />
        <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Name</label>
            <input className="form-input" placeholder="Guest name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Rating</label>
            <select className="form-input">
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-stone-700">Review message</label>
            <textarea rows={5} className="form-input" placeholder="Tell us about your dining experience" />
          </div>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
            <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">Submit review</button>
            <p className="text-sm text-stone-500">Reviews are moderated before appearing publicly in this portfolio demo.</p>
          </div>
        </form>
        {submitted ? <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Review submitted successfully for the demo experience.</div> : null}
      </MotionBlock>
    </section>
  );
}
