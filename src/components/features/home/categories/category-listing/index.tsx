"use client";

import Title from "@/components/features/shared/title";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrl } from "@/lib/utils";
import { getCategories } from "@/service/category.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function CategoryListing() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });

  console.log("categories=====", categories);

  if (isLoading) {
    return (
      <div className="pb-10">
        <Title title="Collections" className="pt-0" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-[4/3] relative rounded-lg overflow-hidden"
            >
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categories?.length) {
    return null;
  }

  return (
    <div className="pb-10">
      <Title title="Collections" className="pt-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative rounded-lg overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={getImageUrl(category.imageUrl)}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
