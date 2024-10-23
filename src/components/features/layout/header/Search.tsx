import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mx-3 lg:w-auto w-full lg:col-span-1 col-span-3 mt-6 lg:mt-auto">
      <div className="relative">
        <SearchIcon
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"
          size={22}
        />
        <Input
          type="text"
          placeholder="Search for..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-2 h-10 lg:h-[50px] w-full border rounded-full text-[16px]"
        />
      </div>
    </div>
  );
}
