"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Props {
   route: string;
   iconPosition: string;
   imgSrc: string;
   placeholder: string;
   otherClasses?: string;
}

const LocalSearchBar = ({
   iconPosition,
   imgSrc,
   placeholder,
   route,
   otherClasses,
}: Props) => {
   return (
      <div
         className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
      >
         {iconPosition === "left" && (
            <Image
               className="cursor-pointer"
               width={24}
               height={24}
               alt="search icon"
               src={imgSrc}
            />
         )}
         <Input
            type="text"
            placeholder={placeholder}
            onChange={() => {}}
            className="no-focus paragraph-regular placeholder background-light800_darkgradient border-none shadow-none outline-none"
         />
         {iconPosition === "right" && (
            <Image
               className="cursor-pointer"
               width={24}
               height={24}
               alt="search icon"
               src={imgSrc}
            />
         )}
      </div>
   );
};
export default LocalSearchBar;
