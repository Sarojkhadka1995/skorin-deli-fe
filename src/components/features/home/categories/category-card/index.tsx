import { Card, CardContent } from "@/components/ui/card";
import { ICategory } from "@/types/category.types";
import Image from "next/image";
import React from "react";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <Image
          src={category.image}
          alt={category.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center group-hover:underline underline-offset-4 transition-all duration-300">
            {category.title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
