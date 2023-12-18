"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags({
   userId,
   limit = 3,
}: GetTopInteractedTagsParams) {
   try {
      await connectToDatabase();
      const user = await User.findById(userId);

      if (!user) throw new Error("User Not Found!");

      return [
         { _id: "1", name: "tag" },
         { _id: "2", name: "tag1" },
      ];
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function getAllTags(params: GetAllTagsParams) {
   try {
      await connectToDatabase();

      const tags = await Tag.find({});

      return { tags };
   } catch (error) {
      console.log(error);
      throw error;
   }
}
