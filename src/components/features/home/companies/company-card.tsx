"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getImageUrl } from "@/lib/utils";
import { ICompany } from "@/interface/company.types";
import { COMMON_IMAGES } from "@/config/image";

interface CompanyCardProps {
  company: ICompany;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const [imageError, setImageError] = useState(false);
  return (
    <Link href={`/companies/${company.slug}`}>
      <div className="text-center space-y-2">
        <div className="relative aspect-square rounded-full overflow-hidden border border-gray-200">
          {!imageError ? (
            <Image
              src={getImageUrl(company.imageUrl)}
              onError={() => setImageError(true)}
              alt={company.name}
              fill
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <Image
              src={COMMON_IMAGES.noImage}
              alt="No Image"
              fill
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-110"
            />
            // <div className="w-full h-full flex items-center justify-center bg-gray-100">
            //   <div className="text-xs text-gray-400">No Image</div>
            // </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-700 capitalize">
          {company.name}
        </h3>
      </div>
    </Link>
  );
};

export default CompanyCard;
