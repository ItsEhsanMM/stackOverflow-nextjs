"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

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
   } catch (error) {}
}
