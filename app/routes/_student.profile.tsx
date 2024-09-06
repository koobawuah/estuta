import { ProfileHeader } from "@/components/profile-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/models/user.server";
import { getUserId } from "@/session.server";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

export default function Profile() {
	return (
		<div className="relative flex flex-col">
			<header className="min-h-max my-3">
				{/* <h2 className="text-xl font-bold">Profile</h2> */}
				<ProfileHeader>
					<ul className="flex space-x-6 md:mr-6">
						<li>
							<NavLink
								to="/profile"
								end
								className={({ isActive }) =>
									isActive
										? "py-3 font-medium text-purple-500 border-b-2 border-b-purple-500"
										: "py-3 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-purple-500 transition"
								}
							>
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/account"
								className={({ isActive }) =>
									isActive
										? "py-3 font-medium text-purple-500 border-b-2 border-b-purple-500"
										: "py-3 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-purple-500 transition"
								}
							>
								Account
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/payments"
								className={({ isActive }) =>
									isActive
										? "py-3 font-medium text-purple-500 border-b-2 border-b-purple-500"
										: "py-3 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-purple-500 transition"
								}
							>
								Payments
							</NavLink>
						</li>
					</ul>
				</ProfileHeader>
			</header>
			<div className="w-full max-w-7xl mt-28 mx-auto">
				<Outlet />
			</div>
		</div>
	);
}
