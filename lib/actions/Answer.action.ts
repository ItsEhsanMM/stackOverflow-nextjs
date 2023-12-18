"use server";

import Answer from "@/database/answer.model";
import {
   AnswerVoteParams,
   CreateAnswerParams,
   GetAnswersParams,
} from "./shared.types";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function CreateAnswer({
   author,
   content,
   path,
   question,
}: CreateAnswerParams) {
   try {
      connectToDatabase();

      const newAnswer = await Answer.create({
         author,
         content,
         question,
      });

      console.log(question);

      await Question.findByIdAndUpdate(question, {
         $push: { answers: newAnswer._id },
      });

      revalidatePath(path);

      return newAnswer;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function GetAnswers({ questionId }: GetAnswersParams) {
   try {
      connectToDatabase();

      const answers = await Answer.find({ question: questionId })
         .populate("author", "_id clerkId name picture")
         .sort({ createdAt: -1 });

      return { answers };
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function upVoteAnswer({
   hasDownVoted,
   hasUpVoted,
   path,
   answerId,
   userId,
}: AnswerVoteParams) {
   console.log(answerId);

   try {
      connectToDatabase();

      let updateQuery = {};

      if (hasUpVoted) {
         updateQuery = { $pull: { upvotes: userId } };
      } else if (hasDownVoted) {
         updateQuery = {
            $pull: { downvotes: userId },
            $push: { upvotes: userId },
         };
      } else {
         updateQuery = { $addToSet: { upvotes: userId } };
      }

      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
         new: true,
      });

      if (!answer) {
         throw new Error("Answer Not Found!");
      }
      // TODO: add author reputation by +10
      revalidatePath(path);
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function downVoteAnswer({
   hasDownVoted,
   hasUpVoted,
   path,
   answerId,
   userId,
}: AnswerVoteParams) {
   try {
      connectToDatabase();

      let updateQuery = {};

      if (hasDownVoted) {
         updateQuery = { $pull: { downvotes: userId } };
      } else if (hasUpVoted) {
         updateQuery = {
            $pull: { upvotes: userId },
            $push: { downvotes: userId },
         };
      } else {
         updateQuery = { $addToSet: { downvotes: userId } };
      }

      const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
         new: true,
      });

      if (!answer) {
         throw new Error("Answer Not Found!");
      }

      // TODO: add author reputation by +10

      revalidatePath(path);
   } catch (error) {
      console.log(error);
      throw error;
   }
}
