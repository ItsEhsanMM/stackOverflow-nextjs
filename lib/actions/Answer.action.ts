"use server";

import Answer from "@/database/answer.model";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
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
