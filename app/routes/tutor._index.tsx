import { Link, Outlet } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { TopLayout } from "@/components/tutor/TopLayout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventItem } from "./_student.schedule";
import {
	AcademicCapIcon,
	ArchiveBoxIcon,
	CalendarDateRangeIcon,
} from "@heroicons/react/24/outline";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorIndex() {
	return (
		<div className="max-w-6xl mx-auto w-full space-y-5">
			<div className="flex flex-row justify-between">
				<aside className="">
					<span className="font-light text-sm">
						{Intl.DateTimeFormat("en-GH", { dateStyle: "full" }).format(
							new Date(),
						)}
					</span>
					<h2 className="font-bold text-2xl">Good morning, {"Kofi"}</h2>
					<p className="font-normal text-base">
						Do you know where your students are coming?
					</p>
				</aside>
				<div className="hidden md:block">
					<p>Some information</p>
					<p>Check out the tasks</p>
				</div>
			</div>
			<Card className="p-6">
				<CardContent className="p-0 grid md:grid-cols-2 lg:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2">
					<div className="py-4 md:py-0 md:px-8 flex flex-col space-y-1.5">
						<p className="font-normal text-base">New Students</p>
						<span className="font-normal text-2xl">4</span>
					</div>
					<div className="py-4 md:py-0 md:px-8 flex flex-col space-y-1.5">
						<p className="font-normal text-base">Pending Reviews</p>
						<span className="font-normal text-2xl">8</span>
					</div>
					<div className="py-4 md:py-0 md:px-8 flex flex-col space-y-1.5">
						<p className="font-normal text-base">Upcoming Meetings</p>
						<span className="font-normal text-2xl">2</span>
					</div>
					<div className="py-4 md:py-0 md:px-8 flex flex-col space-y-1.5">
						<p className="font-normal text-base">Earnings</p>
						<span className="font-normal text-2xl">GHS12,000</span>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 mt-5">
				<Card>
					<CardHeader>
						<CardTitle>Start here</CardTitle>
						<CardDescription>Some actions you can take now</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-2 gap-4">
						<Link
							to="/tutor/classrooms/new"
							className="p-1.5 bg-transparent rounded-sm border border-gray-200 shadow-sm hover:bg-gray-100 flex flex-row items-center transition-all"
						>
							<AcademicCapIcon className="size-4 mr-1.5" />
							<p className="text-sm font-medium">New Classroom</p>
						</Link>
						<Link
							to="/tutor/classrooms/modules/new"
							className="p-1.5 bg-transparent rounded-sm border border-gray-200 shadow-sm hover:bg-gray-100 flex flex-row items-center transition-all"
						>
							<ArchiveBoxIcon className="size-4 mr-1.5" />
							<p className="text-sm font-medium">New Module</p>
						</Link>
						<Link
							to="/calendar"
							className="p-1.5 bg-transparent rounded-sm border border-gray-200 shadow-sm hover:bg-gray-100 flex flex-row items-center transition-all"
						>
							<CalendarDateRangeIcon className="size-4 mr-1.5" />
							<p className="text-sm font-medium">View Calendar</p>
						</Link>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Pending Reviews</CardTitle>
						<CardDescription>
							Review pending submissions from your students
						</CardDescription>
					</CardHeader>
					<CardContent className="">
						<ul className="space-y-2.5">
							<li className="flex flex-row justify-between items-center">
								Submission 1: Lorem Ipsum{" "}
								<span className="text-xs">2hrs ago</span>
							</li>
							<li className="flex flex-row justify-between items-center">
								Submission 2: Lorem Ipsum{" "}
								<span className="text-xs">13hrs ago</span>
							</li>
							<li className="flex flex-row justify-between items-center">
								Submission 3: Lorem Ipsum{" "}
								<span className="text-xs">20hrs ago</span>
							</li>
							<li className="flex flex-row justify-between items-center">
								Submission 4: Lorem Ipsum{" "}
								<span className="text-xs">1day ago</span>
							</li>
						</ul>
					</CardContent>
				</Card>
				<Card className="">
					<CardHeader>
						<CardTitle>Upcoming</CardTitle>
						<CardDescription>Your upcoming events</CardDescription>
					</CardHeader>
					<CardContent className="">
						<div className="h-full space-y-3">
							<h3 className="text-3xl font-semibold text-orange-600">
								{Intl.DateTimeFormat("en-GH", {
									day: "numeric",
									month: "short",
								}).format(new Date())}
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
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
