import { ProgressCheck } from "@/components/progress-check";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/styles";
import { users } from "@/models/user.server";
import { getUserId } from "@/session.server";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

const upcomingCourses = [
	{
		course: "IT Law",
		lesson: "lesson 2",
		description: "Short description about upcoming course",
	},
	{
		course: "Intro to Java",
		lesson: "lesson 4",
		description: "Short description about upcoming course",
	},
	{
		course: "Algorithms & Data Structure",
		lesson: "lesson 1",
		description: "Short description about upcoming course",
	},
	{
		course: "Web Development and Web...",
		lesson: "lesson 6",
		description: "Short description about upcoming course",
	},
];

export default function Schedule() {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className="max-w-7xl space-y-6">
			<h2 className="text-xl font-bold">New timeline stuff</h2>
			{/* <div></div> */}

			<h2 className="text-xl font-bold">Upcoming</h2>
			<div className="w-full py-3 flex gap-6 overflow-x-scroll">
				{upcomingCourses.map((u) => (
					<Card className="min-w-72" key={u.lesson}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{u.course}</CardTitle>
							{/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{u.lesson}</div>
							<p className="text-xs text-muted-foreground">{u.description}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<h2 className="text-xl font-bold">Schedule</h2>
			<div className="max-w-7xl my-6 grid md:grid-cols-1 xl:grid-cols-2 gap-6">
				<Card className="">
					<CardHeader className="gap-3 pb-3">
						<div className="h-[300px] bg-gray-100 rounded-lg">
							<span className="sr-only">Course outlook preview</span>
						</div>
						<CardTitle>{"IT Law"} · Resume Course</CardTitle>
						<CardDescription className="max-w-lg text-balance leading-relaxed">
							Introducing Our Dynamic Scheduled Course modules for a Seamless
							Learning Experience and Insightful Analysis.
						</CardDescription>
					</CardHeader>
					<CardFooter className="max-w-lg flex flex-col gap-6 items-start">
						<ProgressCheck progress={27} progressColor="#AB82FE" />
						<Button className="bg-[#EDF495] text-lime-900">View course</Button>
					</CardFooter>
				</Card>
				<Card className="self-start">
					<CardHeader>
						<CardTitle className="text-lg">At a glance</CardTitle>
					</CardHeader>
					<CardContent className="">
						<div className="flex flex-col lg:flex-row gap-6">
							<Calendar
								mode="single"
								selected={date}
								disabled={{ before: new Date() }}
								onSelect={(v) => setDate(v)}
								className="max-w-max mx-auto rounded-md border"
							/>
							<div className="h-full p-2.5 space-y-3">
								<h3 className="text-3xl font-semibold text-orange-600">
									{Intl.DateTimeFormat("en-GH", {
										day: "numeric",
										month: "short",
									}).format(date)}
								</h3>
								<ul className="h-60 space-y-3 overflow-y-scroll">
									<li>
										<EventItem
											title="Revision exercise"
											time="13:30 PM"
											className="border-l-lime-400 bg-lime-50 text-lime-900"
										/>
									</li>

									<li>
										<EventItem
											title="Course work submission deadline"
											time="15:45 PM"
											className="border-l-orange-400 bg-orange-50 text-orange-900"
										/>
									</li>

									<li>
										<EventItem
											title="New Assignment"
											time="18:00 PM"
											className="border-l-blue-400 bg-blue-50 text-blue-900"
										/>
									</li>

									<li>
										<EventItem
											title="Weekend recap"
											time="12:00 PM"
											className="border-l-red-500 bg-red-200 text-red-900"
										/>
									</li>

									<li>
										<EventItem
											title="Weekly Quiz"
											time="12:00 PM"
											className="border-l-indigo-500 bg-indigo-200 text-indigo-900"
										/>
									</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export function EventItem({
	title,
	time,
	className,
}: {
	title: string;
	time: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"border-l-4 py-2.5 border-l-amber-400 pl-2.5 bg-amber-50",
				className,
			)}
		>
			{title} - <span className="font-medium">{time}</span>
		</div>
	);
}
