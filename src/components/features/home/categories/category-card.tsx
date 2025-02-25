import Image from "next/image";
import Link from "next/link";
import { ICategory } from "@/interface/category.types";
import { getImageUrl } from "@/lib/utils";
import { COMMON_IMAGES } from "@/config/image";

interface CategoryCardProps {
  category: ICategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="text-center space-y-2">
        <div className="relative aspect-square rounded-full overflow-hidden border border-gray-200">
          {/* {category.imageUrl ? ( */}
          <Image
            src={getImageUrl(category.imageUrl)}
            onError={(e) => {
              e.currentTarget.src = COMMON_IMAGES.noImage;
            }}
            alt={category.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
          {/* ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              No Image
            </div>
          )} */}
        </div>
        <h3 className="text-sm font-medium text-gray-700 capitalize">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
