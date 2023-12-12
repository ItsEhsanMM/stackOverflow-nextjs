"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

interface Props {
   userId: string;
}

export async function getUserById({ userId }: Props) {
   console.log({ clerkId: userId });

   try {
      connectToDatabase();

      const user = await User.findOne({ clerkId: userId });

      return user;
   } catch (error) {
      console.log("Error in getting user by id", error);
      throw error;
   }
}
