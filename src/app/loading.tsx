import { SkeletonBlock } from "@/components/shared/skeleton-block";

export default function GlobalLoading() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-8">
      <SkeletonBlock />
    </div>
  );
}

