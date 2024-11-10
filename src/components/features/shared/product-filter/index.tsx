"use client";

// import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { ChevronDown } from "lucide-react";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
  { label: "Newest", value: "newest" },
];

// const brands = [
//   { label: "All Brands", value: "all" },
//   { label: "Brand 1", value: "brand1" },
//   { label: "Brand 2", value: "brand2" },
//   { label: "Brand 3", value: "brand3" },
// ];

interface FilterSortProps {
  onSort: (value: string) => void;
  sortBy: string;
}

const FilterSort = ({ onSort, sortBy }: FilterSortProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-4 mb-6">
      {/* Uncomment later */}

      {/* <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Filter:</span>
        <Button variant="outline" className="h-9 gap-1">
          More filters
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Select>
          <SelectTrigger className="h-9 w-[150px]">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.value} value={brand.value}>
                {brand.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* Uncomment later */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={sortBy} onValueChange={onSort}>
          <SelectTrigger className="h-9 w-[150px]">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSort;
