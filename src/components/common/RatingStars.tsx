export default function RatingStars({ rating, count, compact = false }: { rating: number; count?: number; compact?: boolean }) {
  const fullStars = Math.round(rating);

  return (
    <div className={`flex items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      <div className="flex text-amber-500">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index}>{index < fullStars ? "★" : "☆"}</span>
        ))}
      </div>
      <span className="text-slate-500">
        {rating.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </div>
  );
}
