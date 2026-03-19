import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";
import StarRating from "../components/common/StarRating";
import { useAuth } from "../context/AuthContext";
import { testimonials } from "../data/site";
import { createReview, getReviews, type ReviewItem } from "../lib/api";

const reviewHighlights = [
  { label: "Repeat bookings", value: "86%" },
  { label: "Private event satisfaction", value: "4.9/5" },
  { label: "Service and ambiance", value: "Top rated" },
];

const fallbackReviews: ReviewItem[] = testimonials.map((testimonial, index) => ({
  id: `seed-${index + 1}`,
  name: testimonial.name,
  role: testimonial.role,
  rating: testimonial.rating,
  quote: testimonial.quote,
  avatar: testimonial.avatar,
  createdAt: new Date().toISOString(),
}));

export default function ReviewsPage() {
  const { isLoggedIn, user } = useAuth();
  const [reviews, setReviews] = useState<ReviewItem[]>(fallbackReviews);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        const nextReviews = await getReviews();
        if (active && nextReviews.length > 0) {
          setReviews(nextReviews);
        }
      } catch {
        if (active) {
          setReviews(fallbackReviews);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadReviews();
    return () => {
      active = false;
    };
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 4.8;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn) {
      setSubmitted(false);
      setMessage("Please login first before leaving a review.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setSubmitting(true);
      setSubmitted(false);
      setMessage("");
      const newReview = await createReview({
        name: String(formData.get("name") ?? user?.name ?? "Guest"),
        role: "Verified guest",
        rating: Number(formData.get("rating") ?? 5),
        quote: String(formData.get("quote") ?? ""),
      });
      setReviews((current) => [newReview, ...current]);
      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitted(false);
      setMessage(error instanceof Error ? error.message : "Could not submit the review right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-[118rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
      <SectionIntro eyebrow="Reviews" title="Trust-building testimonials with a premium, editorial layout." description="This page now reads from the built-in project database so new guest reviews appear for every visitor using the same server or local showcase storage." align="center" />

      <MotionBlock className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_55px_rgba(221,210,192,0.3)] sm:p-8">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Average rating</p>
            <p className="mt-3 text-5xl font-semibold text-stone-900">{averageRating}/5</p>
            <StarRating rating={Math.round(averageRating)} className="mt-4 justify-center md:justify-start" />
            <p className="mt-3 text-stone-600">Based on {reviews.length} saved guest reviews.</p>
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
        {(loading ? fallbackReviews : reviews).map((review, index) => (
          <MotionBlock key={review.id} delay={index * 0.05} className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_55px_rgba(221,210,192,0.3)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-stone-900 text-sm font-semibold text-white">{review.avatar}</div>
              <div>
                <p className="font-semibold text-stone-900">{review.name}</p>
                <p className="text-sm text-stone-500">{review.role}</p>
              </div>
            </div>
            <StarRating rating={review.rating} className="mt-5" />
            <p className="mt-4 text-sm leading-7 text-stone-600">{review.quote}</p>
          </MotionBlock>
        ))}
      </div>

      <MotionBlock className="mt-12 rounded-[2.25rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(221,210,192,0.34)] sm:p-8">
        <SectionIntro eyebrow="Leave a Review" title="Invite guests to share polished, trust-building feedback." description="Submitted reviews are saved and can be deleted from the admin panel." />
        {!isLoggedIn ? (
          <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
            Please login first to submit a review. <Link to="/login" className="font-semibold text-stone-900 underline-offset-4 hover:underline">Open login</Link>
          </div>
        ) : null}
        <form className="mt-8" onSubmit={handleSubmit}>
          <fieldset disabled={!isLoggedIn || submitting} className="grid gap-5 disabled:cursor-not-allowed disabled:opacity-60 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Name</label>
              <input name="name" className="form-input" placeholder="Guest name" defaultValue={user?.name ?? ""} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">Rating</label>
              <select name="rating" className="form-input" defaultValue="5">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-stone-700">Review message</label>
              <textarea name="quote" rows={5} className="form-input" placeholder="Tell us about your dining experience" />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
              <button type="submit" className="rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800">
                {submitting ? "Saving..." : "Submit review"}
              </button>
              <p className="text-sm text-stone-500">Reviews are manageable from the admin panel after submission.</p>
            </div>
          </fieldset>
        </form>
        {message ? <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{message}</div> : null}
        {submitted ? <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Review submitted successfully and saved.</div> : null}
      </MotionBlock>
    </section>
  );
}
