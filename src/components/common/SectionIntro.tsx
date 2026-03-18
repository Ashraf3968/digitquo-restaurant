type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionIntro({ eyebrow, title, description, align = "left" }: SectionIntroProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700/80">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">{description}</p>
    </div>
  );
}

