import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { IQuestion } from "@/database/question.model";
import { getQuestionsByTagId } from "@/lib/actions/Question.action";
import { URLProps } from "@/types";

const Page = async ({ params: { id }, searchParams }: URLProps) => {
   const result = await getQuestionsByTagId({
      tagId: id,
      page: 1,
      searchQuery: searchParams.q,
   });

   return (
      <>
         <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
         <div className="mt-11 w-full">
            <LocalSearchBar
               iconPosition="left"
               imgSrc="/assets/icons/search.svg"
               placeholder="Search tag questions"
               otherClasses="flex-1"
               route="/"
            />
         </div>

         <div className="mt-10 flex w-full flex-col gap-6">
            {result.questions.length > 0 ? (
               result.questions.map((question: IQuestion) => (
                  <QuestionCard
                     key={question._id}
                     _id={question._id}
                     title={question.title}
                     tags={question.tags}
                     author={question.author}
                     upvotes={question.upvotes}
                     views={question.views}
                     answers={question.answers}
                     createdAt={question.createdAt}
                  />
               ))
            ) : (
               <NoResult
                  title="There's no tag question to show"
                  description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                  link="/ask-question"
                  linkTitle="Ask a question"
               />
            )}
         </div>
      </>
   );
};
export default Page;
