import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/User.action";
import Link from "next/link";

const Page = async () => {
  const result = await getAllUsers({});
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Amazing minds"
          otherClasses="flex-1"
          route="/community"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users Yet</p>
            <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};
export default Page;
