import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
   const now = new Date();
   const timeDifference = now.getTime() - createdAt.getTime();

   // Define time units in milliseconds
   const minute = 60 * 1000;
   const hour = 60 * minute;
   const day = 24 * hour;
   const month = 30 * day;
   const year = 365 * day;

   // Calculate the time in different units
   const yearsAgo = Math.floor(timeDifference / year);
   const monthsAgo = Math.floor(timeDifference / month);
   const daysAgo = Math.floor(timeDifference / day);
   const hoursAgo = Math.floor(timeDifference / hour);
   const minutesAgo = Math.floor(timeDifference / minute);

   // Return the formatted timestamp
   if (yearsAgo > 0) {
      return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
   } else if (monthsAgo > 0) {
      return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
   } else if (daysAgo > 0) {
      return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
   } else if (hoursAgo > 0) {
      return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
   } else {
      return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
   }
};

export const formatNumber = (num: number): string => {
   if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
   } else if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "K";
   } else {
      return num.toString();
   }
};
