import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className=" grow flex items-center w-full lg:w-auto">
      <div className="relative h-[50px] w-full">
        <SearchIcon
          className="absolute left-4 top-5 lg:top-1/2 transform -translate-y-1/2 text-gray-800"
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
