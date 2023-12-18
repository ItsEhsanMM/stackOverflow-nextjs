"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
   CreateUserParams,
   DeleteUserParams,
   GetAllUsersParams,
   ToggleSaveQuestionParams,
   UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

interface Props {
   userId: string;
}

export async function getUserById({ userId }: Props) {
   try {
      connectToDatabase();

      const user = await User.findOne({ clerkId: userId });

      return user;
   } catch (error) {
      console.log("Error in getting user by id", error);
      throw error;
   }
}

export async function createUser(params: CreateUserParams) {
   try {
      connectToDatabase();

      const newUser = User.create(params);

      return newUser;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function updateUser({
   clerkId,
   path,
   updateData,
}: UpdateUserParams) {
   try {
      connectToDatabase();

      await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

      revalidatePath(path);
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function deleteUser({ clerkId }: DeleteUserParams) {
   try {
      connectToDatabase();

      const user = await User.findOneAndDelete({ clerkId });

      if (!user) {
         throw new Error(`No user found with the id ${clerkId}`);
      }

      // const userQuestionIds = await Question.find({
      //    author: user._id,
      // }).distinct("_id");

      await Question.deleteMany({ author: user._id });

      const deletedUser = await User.findByIdAndDelete(user._id);

      return deletedUser;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function getAllUsers({
   page = 1,
   pageSize = 20,
   filter,
   searchQuery,
}: GetAllUsersParams) {
   try {
      connectToDatabase();
      const users = await User.find({}).sort({ createdAt: -1 });

      return { users };
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function toggleSaveQuestion({
   path,
   questionId,
   userId,
}: ToggleSaveQuestionParams) {
   try {
      const user = await User.findById(userId);

      if (!user) {
         throw new Error("No User Found");
      }

      const isQuestionSaved = user.saved.includes(questionId);

      if (isQuestionSaved) {
         await User.findByIdAndUpdate(
            userId,
            {
               $pull: { saved: questionId },
            },
            { new: true }
         );
      } else {
         await User.findByIdAndUpdate(
            userId,
            {
               $addToSet: { saved: questionId },
            },
            { new: true }
         );
      }

      revalidatePath(path);
   } catch (error) {
      console.log(error);
      throw error;
   }
}
