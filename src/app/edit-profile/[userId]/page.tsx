import { EditUserForm } from "./edit-profile-form";
import { unstable_noStore } from "next/cache";
import { getUserById } from "@/data-access/users";

export default async function EditUserPage({
  params,
}: {
  params: { userId: string };
}) {
  unstable_noStore();
  const user = await getUserById(params.userId);

  if (!user) {
    return <div>User Not Found</div>;
  }

  return (
    <div className="container flex flex-col  mx-auto pt-12 pb-24">
        <EditUserForm user={user} />
    </div>
  );
}