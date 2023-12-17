"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import { GetQuestionByIdParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";

export async function getQuestions(params: GetQuestionsParams) {
   try {
      connectToDatabase();
      const questions = await Question.find({})
         .populate({ path: "tags", model: Tag })
         .populate({ path: "author", model: User });

      return { questions };
   } catch (error) {
      console.log(error);
   }
}

export async function createQuestion(params: any) {
   try {
      connectToDatabase();

      const { title, content, author, tags, path } = params;

      const question = await Question.create({
         title,
         content,
         author,
      });

      const TagDocument = [];

      for (const tag of tags) {
         const existedTag = await Tag.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${tag}$`, "i") } },
            { $setOnInsert: { name: tag }, $push: { question: question._id } },
            { upsert: true, new: true }
         );
         TagDocument.push(existedTag._id);
      }

      await Question.findByIdAndUpdate(question._id, {
         $push: { tags: { $each: TagDocument } },
      });

      revalidatePath(path);
   } catch (error) {}
}

export async function GetQuestionById({ questionId }: GetQuestionByIdParams) {
   console.log(questionId);

   try {
      connectToDatabase();
      const question = await Question.findById(questionId)
         .populate({
            path: "tags",
            model: Tag,
            select: "_id name",
         })
         .populate({
            path: "author",
            model: User,
            select: "_id clerkId name picture",
         });

      return question;
   } catch (error) {
      console.log(error);
      throw error;
   }
}
