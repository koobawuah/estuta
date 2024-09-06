import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { users } from "@/models/user.server";
import { getUserId } from "@/session.server";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

export default function Index() {
	return (
		<div className="relative flex flex-col">
			<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
				<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Profile</CardTitle>
							<CardDescription>
								View profile details of your account.
							</CardDescription>
						</CardHeader>
						<CardContent className="py-6">
							<div className="grid gap-6">
								<div className="grid grid-cols-[140px_1fr] gap-3">
									<p className="text-gray-500">First Name</p>
									<p className="">Kwame</p>
								</div>

								<div className="grid grid-cols-[140px_1fr] gap-3">
									<p className="text-gray-500">Last Name</p>
									<p className="">Ampofo</p>
								</div>

								<div className="grid grid-cols-[140px_1fr] gap-3">
									<p className="text-gray-500">Email</p>
									<p className="">a@admin.com</p>
								</div>

								<div className="grid grid-cols-[140px_1fr] gap-3">
									<p className="text-gray-500">Account type</p>
									<p className="">Student</p>
								</div>

								<div className="grid grid-cols-[140px_1fr] gap-3">
									<p className="text-gray-500">Submitted Files</p>
									<p className="">
										{[
											"Introduction to AI Assignment",
											"Algorithms & Data Structu...",
											"Introduction to Vis...",
											"Web Development & We...",
										].map((m) => (
											<span
												className="hover:underline transition cursor-default"
												key={m}
											>
												{m},
											</span>
										))}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Overview</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between items-center">
								<p className="text-gray-500">Member since</p>{" "}
								<span className="text-purple-500 font-medium">
									April 3, 2020
								</span>
							</div>

							<div className="flex justify-between items-center">
								<p className="text-gray-500">Completed courses</p>{" "}
								<span className="text-purple-500 font-medium">9</span>
							</div>

							<div className="flex justify-between items-center">
								<p className="text-gray-500">Hours learned</p>{" "}
								<span className="text-purple-500 font-medium">47 hrs</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
