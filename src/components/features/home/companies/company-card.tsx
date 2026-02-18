import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { COMMON_IMAGES } from "@/config/image";
import { ICompany } from "@/interface/company.types";

interface CompanyCardProps {
  company: ICompany;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Link href={`/companies/${company.slug}`}>
      <div className="text-center space-y-2">
        <div className="relative aspect-square rounded-full overflow-hidden border border-gray-200">
          {/* {category.imageUrl ? ( */}
          <Image
            src={getImageUrl(company.imageUrl)}
            onError={(e) => {
              e.currentTarget.src = COMMON_IMAGES.noImage;
            }}
            alt={company.name}
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
          {company.name}
        </h3>
      </div>
    </Link>
  );
};

export default CompanyCard;
