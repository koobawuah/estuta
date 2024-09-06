import { CourseCard } from "@/components/course-card";
import { SearchHeader } from "@/components/search-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { users } from "@/models/user.server";
import { getUserId } from "@/session.server";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

export const courses = [
	{
		id: "6add9803290dsa899089d92a",
		courseTitle: "Building a SaaS product as a software developer",
		courseTutor: "Nana Yaw",
		courseDescription:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa maiores deleniti consectetur nobis et eaque.",
		courseCategory: ["Technology", "Beginner"],
		courseDuration: 50,
		coursePrice: 12000,
		publishedAt: new Date(),
		link: `/courses/${"6add9803290dsa899089d92a"}`,
		payLink: `/pay/${"6add9803290dsa899089d92a"}`,
	},
];

export default function Courses() {
	const [search, setSearch] = useState<string>();

	return (
		<div className="">
			<div className="max-w-7xl">
				<SearchHeader heading="Find your next skill! Select from the best online courses" />
			</div>
			<div className="max-w-7xl mt-20 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
				<div className="w-full flex flex-col space-y-3">
					{courses.map((n) => (
						<CourseCard
							key={n.id}
							courseTitle={n.courseTitle}
							courseTutor={n.courseTutor}
							courseDescription={n.courseDescription}
							courseCateogory={n.courseCategory}
							coursePrice={n.coursePrice}
							courseDuration={n.courseDuration}
							publishedAt={n.publishedAt}
							payLink={n.payLink}
							link={n.link}
						/>
					))}
				</div>
				<Card className="self-start bg-amber-50 border-transparent space-y-3">
					<h2 className="text-lg font-semibold text-gray-950 px-6 pt-6">
						How to start studying
					</h2>
					<CardContent className="">
						<p className="text-gray-500">
							Read the course descriptions to prepare for classroom sessions
						</p>
					</CardContent>
					<CardFooter>
						<Link to="/" className="font-medium text-purple-500">
							Read the instructions
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
