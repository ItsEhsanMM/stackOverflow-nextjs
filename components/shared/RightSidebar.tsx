import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const topQuestions = [
   { _id: "1", question: "question1" },
   { _id: "2", question: "question2" },
   { _id: "3", question: "question3" },
   { _id: "4", question: "question4" },
   { _id: "5", question: "question5" },
];

const popularTags = [
   { _id: "1", name: "js", totalCount: 5 },
   { _id: "2", name: "react", totalCount: 6 },
   { _id: "3", name: "vue", totalCount: 2 },
   { _id: "4", name: "redux", totalCount: 4 },
   { _id: "5", name: "angular", totalCount: 10 },
];

const RightSidebar = () => {
   return (
      <section className="background-light900_dark200 custom-scrollbar light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col justify-between overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
         <div>
            <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
            <div className="mt-7 flex w-full flex-col gap-[30px]">
               {topQuestions.map((question) => (
                  <Link
                     href={`/question/${question._id}`}
                     key={question._id}
                     className="flex cursor-pointer items-center justify-between gap-7"
                  >
                     <p className="body-medium text-dark500_light700">
                        {question.question}
                     </p>
                     <Image
                        src="/assets/icons/chevron-right.svg"
                        width={20}
                        height={20}
                        alt="chevron right"
                        className="invert-colors"
                     />
                  </Link>
               ))}
            </div>
         </div>
         <div className="mt-16">
            <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
            <div className="mt-7 flex flex-col gap-4">
               {popularTags.map((tag) => (
                  <RenderTag
                     key={tag._id}
                     _id={tag._id}
                     name={tag.name}
                     showCount
                     totalQuestions={tag.totalCount}
                  />
               ))}
            </div>
         </div>
      </section>
   );
};
export default RightSidebar;
