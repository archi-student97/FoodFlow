"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui.store";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  onSearch?: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ onSearch, placeholder = "Search dishes or restaurants" }: SearchBarProps) {
  const query = useUIStore((s) => s.query);
  const setQuery = useUIStore((s) => s.setQuery);
  const [value, setValue] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => setQuery(value), 300);
    return () => clearTimeout(t);
  }, [value, setQuery]);

  const handleSearch = () => {
    setQuery(value);
    onSearch?.(value.trim());
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          className="h-12 rounded-2xl border-zinc-200 bg-white/95 pl-10 text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] focus:border-orange-400"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
      </div>
      <Button className="h-12 rounded-2xl px-7 text-sm font-bold" onClick={handleSearch}>Search</Button>
    </div>
  );
}
