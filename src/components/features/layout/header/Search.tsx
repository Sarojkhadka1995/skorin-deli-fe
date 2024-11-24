import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const router = useRouter();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() || debouncedQuery === "") {
      handleSearch();
    }
  }, [debouncedQuery]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to the search results with query
      router.push(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      if (window.location.pathname === "/search") {
        router.push("/search");
      }
    }
  };

  return (
    <div className="grow flex items-center w-full lg:w-auto">
      <div className="relative h-[50px] w-full">
        <Button
          variant="ghost"
          onClick={handleSearch}
          className="absolute left-2 top-5 lg:top-1/2 transform -translate-y-1/2"
          size="icon"
        >
          <SearchIcon className="text-gray-800" size={22} />
        </Button>
        <Input
          type="text"
          placeholder="Search for..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="pl-12 pr-4 py-2 h-10 lg:h-[50px] w-full border rounded-full text-[16px]"
        />
      </div>
    </div>
  );
}
