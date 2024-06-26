import { Input } from "@/components/ui/input";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-lg px-4">
        <Image
          className="cursor-pointer"
          width={24}
          height={24}
          alt="search"
          src="/assets/icons/search.svg"
        />
        <Input
          type="text"
          placeholder="Search..."
          className="no-focus paragraph-regular placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};
export default GlobalSearch;
