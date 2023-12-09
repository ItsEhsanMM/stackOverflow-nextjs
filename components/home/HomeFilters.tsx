"use client";

import { useState } from "react";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
   const [active, setActive] = useState("");

   return (
      <div className="mt-10 hidden flex-wrap gap-3 md:flex">
         {HomePageFilters.map((item) => (
            <Button
               key={item.value}
               className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
                  active === item.value
                     ? "bg-primary-100 text-primary-500"
                     : "background-light800_darkgradient text-light400_light500"
               }`}
               onClick={() => setActive(item.value)}
            >
               {item.name}
            </Button>
         ))}
      </div>
   );
};
export default HomeFilters;
