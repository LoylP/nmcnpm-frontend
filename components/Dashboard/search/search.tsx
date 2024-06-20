"use client";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const Search = ({ placeholder, onSearch }: SearchProps) => {
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    300
  );

  return (
    <div className="flex items-center gap-2 bg-slate-600 p-2 rounded-lg w-max">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent rounded-none text-white outline-none"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
