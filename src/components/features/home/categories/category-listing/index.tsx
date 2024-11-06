import Title from "@/components/features/shared/title";
import Image from "next/image";
import Link from "next/link";
import { banner } from "../../../../../../image-config";

interface Collection {
  id: string;
  title: string;
  image: string;
  slug: string;
}

const collections: Collection[] = [
  {
    id: "1",
    title: "Christmas Pre-order",
    image: banner,
    slug: "christmas-pre-order",
  },
  {
    id: "2",
    title: "Clearance",
    image: banner,
    slug: "clearance",
  },
  {
    id: "3",
    title: "Liquor",
    image: banner,
    slug: "liquor",
  },
  {
    id: "4",
    title: "Pasta & Gnocchi",
    image: banner,
    slug: "pasta-gnocchi",
  },
  {
    id: "5",
    title: "Rice & Grains",
    image: banner,
    slug: "rice-grains",
  },
  {
    id: "6",
    title: "Pasta & Pizza Sauces",
    image: banner,
    slug: "sauces",
  },
];

export default function CategoryListing() {
  return (
    <div className="pb-10">
      <Title title="Collections" className="pt-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="group relative rounded-lg overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
              {collection.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
