"use server";

import Answer from "@/database/answer.model";
import { CreateAnswerParams } from "./shared.types";
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

      await Question.findByIdAndUpdate(question, {
         $push: { answer: newAnswer._id },
      });

      revalidatePath(path);

      return newAnswer;
   } catch (error) {
      console.log(error);
      throw error;
   }
}
