export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl text-slate-950 md:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
