import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/User.action";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Ask = async () => {
   // const { userId } = auth();
   const userId = "60e5348364b14f660652629a";

   if (!userId) redirect("/sign-in");

   const mongoUser = await getUserById({ userId });

   return (
      <div>
         <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
         <div className="mt-9">
            <Question mongoUserId={JSON.stringify(mongoUser._id)} />
         </div>
      </div>
   );
};
export default Ask;
