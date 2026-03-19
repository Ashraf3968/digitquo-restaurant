import MotionBlock from "../components/common/MotionBlock";
import SectionIntro from "../components/common/SectionIntro";

const sections = [
  {
    title: "Reservations and bookings",
    text: "Reservation requests are subject to table availability and may require confirmation during peak service. Private dining requests may involve additional coordination and deposits.",
  },
  {
    title: "Menu and pricing",
    text: "Menu items, ingredients, and pricing shown on this portfolio website are illustrative and may change based on seasonal availability, sourcing, and chef direction.",
  },
  {
    title: "Guest information",
    text: "Information entered through forms on this demo is for presentation purposes only. In a live deployment, privacy handling and operational workflows would be configured for the restaurant.",
  },
  {
    title: "Events and private dining",
    text: "Private dining, celebration packages, and event bookings may be subject to separate service agreements, minimum spend requirements, or custom menu arrangements.",
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-[82rem] px-3 py-12 sm:px-4 xl:px-5 2xl:px-6 lg:py-16">
      <SectionIntro
        eyebrow="Terms and Conditions"
        title="Clear hospitality terms presented in a polished, brand-appropriate format."
        description="This page helps complete the commercial feel of the project while giving the restaurant a professional legal and policy presence."
      />
      <div className="mt-10 grid gap-5">
        {sections.map((section, index) => (
          <MotionBlock key={section.title} delay={index * 0.06} className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_50px_rgba(221,210,192,0.28)] sm:p-8">
            <h2 className="text-2xl font-semibold text-stone-900">{section.title}</h2>
            <p className="mt-4 text-sm leading-8 text-stone-600">{section.text}</p>
          </MotionBlock>
        ))}
      </div>
    </section>
  );
}
