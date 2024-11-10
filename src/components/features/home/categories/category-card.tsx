import Image from "next/image";
import Link from "next/link";
import { ICategory } from "@/interface/category.types";

interface CategoryCardProps {
  category: ICategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="text-center space-y-2">
        <div className="relative aspect-square rounded-full overflow-hidden border border-gray-200">
          {category.imageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${category.imageUrl}`}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              No Image
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
