export default function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      <button
        type="button"
        className="h-9 w-9 rounded-full text-lg text-slate-700 hover:bg-slate-100"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        -
      </button>
      <span className="min-w-10 text-center text-sm font-semibold text-slate-900">{value}</span>
      <button
        type="button"
        className="h-9 w-9 rounded-full text-lg text-slate-700 hover:bg-slate-100"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
