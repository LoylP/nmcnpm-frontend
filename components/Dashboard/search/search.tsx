"use client";
import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  placeholder: string;
}

const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1"); // Set page as string

      if (e.target.value) {
        e.target.value.length > 2 && params.set("q", e.target.value);
      } else {
        params.delete("q");
      }
      replace(`${pathname}?${params}`);
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
