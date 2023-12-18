"use client";

import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/Answer.action";
import {
   downVoteQuestion,
   upVoteQuestion,
} from "@/lib/actions/Question.action";
import { toggleSaveQuestion } from "@/lib/actions/User.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
   type: string;
   itemId: string;
   userId: string;
   upVotes: number;
   downVotes: number;
   hasUpVoted: boolean;
   hasDownVoted: boolean;
   hasSaved?: boolean;
}

const Votes = ({
   type,
   itemId,
   userId,
   upVotes,
   downVotes,
   hasUpVoted,
   hasDownVoted,
   hasSaved,
}: Props) => {
   const path = usePathname();
   const router = useRouter();
   const [localeUpVote, setLocaleUpVote] = useState(hasUpVoted);
   const [localeDownVote, setLocaleDownVote] = useState(hasDownVoted);
   const [localeHasSaved, setLocaleHasSaved] = useState(hasSaved);

   useEffect(() => {
      viewQuestion({
         questionId: JSON.parse(itemId),
         userId: userId ? JSON.parse(userId) : undefined,
      });
   }, [itemId, userId, path, router]);

   const handleSave = async () => {
      setLocaleHasSaved(!localeHasSaved);
      if (!userId) {
         return;
      }
      try {
         await toggleSaveQuestion({
            userId: JSON.parse(userId),
            questionId: JSON.parse(itemId),
            path,
         });
      } catch (error) {
         setLocaleHasSaved(!localeHasSaved);
      }
   };

   const handleVote = async (action: string) => {
      if (!userId) {
         return;
      }

      if (action === "upvote") {
         setLocaleUpVote(!hasUpVoted);
         if (hasDownVoted) setLocaleDownVote(false);
         if (type === "question") {
            try {
               await upVoteQuestion({
                  questionId: JSON.parse(itemId),
                  userId: JSON.parse(userId),
                  hasDownVoted,
                  hasUpVoted,
                  path,
               });
            } catch (error) {
               setLocaleUpVote(hasUpVoted);
            }
         } else if (type === "answer") {
            await upVoteAnswer({
               answerId: JSON.parse(itemId),
               userId: JSON.parse(userId),
               hasDownVoted,
               hasUpVoted,
               path,
            });
         }

         // TODO: show a toast
      }

      if (action === "downvote") {
         setLocaleDownVote(!hasDownVoted);

         if (hasUpVoted) setLocaleUpVote(false);

         if (type === "question") {
            try {
               await downVoteQuestion({
                  questionId: JSON.parse(itemId),
                  userId: JSON.parse(userId),
                  hasDownVoted,
                  hasUpVoted,
                  path,
               });
            } catch (error) {
               setLocaleDownVote(hasDownVoted);
            }
         } else if (type === "answer") {
            try {
               await downVoteAnswer({
                  answerId: JSON.parse(itemId),
                  userId: JSON.parse(userId),
                  hasDownVoted,
                  hasUpVoted,
                  path,
               });
            } catch (error) {
               setLocaleDownVote(hasDownVoted);
            }
         }

         // TODO: show a toast
      }
   };

   return (
      <div className="flex gap-5">
         <div className="flex-center gap-2.5">
            {["upvote", "downvote"].map((action) => (
               <div key={action} className="flex-center gap-1.5">
                  <Image
                     src={`/assets/icons/${action}${
                        (action === "upvote" && localeUpVote) ||
                        (action === "downvote" && localeDownVote)
                           ? "d"
                           : ""
                     }.svg`}
                     width={18}
                     height={18}
                     alt={action}
                     className="cursor-pointer"
                     onClick={() => handleVote(action)}
                  />

                  <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                     <p className="subtle-medium text-dark400_light900">
                        {formatNumber(
                           action === "upvote" ? upVotes : downVotes
                        )}
                     </p>
                  </div>
               </div>
            ))}
         </div>
         {type === "question" && (
            <Image
               src={
                  localeHasSaved
                     ? "/assets/icons/star-filled.svg"
                     : "/assets/icons/star-red.svg"
               }
               width={18}
               height={18}
               alt="star"
               className="cursor-pointer"
               onClick={handleSave}
            />
         )}
      </div>
   );
};
export default Votes;
