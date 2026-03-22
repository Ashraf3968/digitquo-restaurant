import CategoryCard from "../components/store/CategoryCard";
import SectionHeading from "../components/common/SectionHeading";
import { createInitialStore } from "../data/seed";

const store = createInitialStore();

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Departments" title="Explore the full Mega Mart category system" description="Browse a realistic supermarket category layout with direct links into product filtering for each department." />
      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">
        {store.categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
