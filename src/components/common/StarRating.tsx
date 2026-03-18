type StarRatingProps = {
  rating: number;
  className?: string;
  size?: "sm" | "md";
};

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

export default function StarRating({ rating, className = "", size = "md" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`.trim()} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const active = index < rating;
        return (
          <svg
            key={index}
            viewBox="0 0 24 24"
            className={`${sizeMap[size]} ${active ? "fill-amber-500 text-amber-500" : "fill-stone-200 text-stone-200"}`}
            aria-hidden="true"
          >
            <path d="M12 2.25l2.93 5.94 6.55.95-4.74 4.62 1.12 6.52L12 17.21l-5.86 3.07 1.12-6.52L2.52 9.14l6.55-.95L12 2.25z" />
          </svg>
        );
      })}
    </div>
  );
}
