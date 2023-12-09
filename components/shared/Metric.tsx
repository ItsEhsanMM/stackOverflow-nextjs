import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
   imgUrl: string;
   alt: string;
   value: string | number;
   title: string;
   textStyles?: string;
   href?: string;
   isAuthor?: boolean;
}

const Metric = ({
   imgUrl,
   alt,
   value,
   title,
   textStyles,
   href,
   isAuthor,
}: MetricProps) => {
   const metricContent = (
      <>
         <Image
            src={imgUrl}
            width={16}
            height={16}
            alt={alt}
            className={`object-contain ${href && "rounded-full"}`}
         />
         <p className={`${textStyles} flex items-center gap-1`}>
            {formatNumber(value)}
            <span
               className={`small-regular line-clamp-1 ${
                  isAuthor && "max-sm:hidden"
               }`}
            >
               {title}
            </span>
         </p>
      </>
   );

   if (href) {
      return (
         <Link href={href} className="flex-center gap-1">
            {metricContent}
         </Link>
      );
   }

   return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};
export default Metric;
