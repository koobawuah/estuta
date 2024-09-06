import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { ProgressCheck } from "@/components/progress-check";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { users } from "@/models/user.server";
import { getUserId } from "@/session.server";
import {
	ArrowTrendingUpIcon,
	BoltIcon,
	CalendarDaysIcon,
	ClipboardDocumentIcon,
	ClockIcon,
	EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Button } from "@/components/ui/button";

export const description = "A multiple bar chart";

export const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#a490d9",
	},
	mobile: {
		label: "Mobile",
		color: "#a411d9",
	},
} satisfies ChartConfig;

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

export default function MyCourses() {
	return (
		<div className="max-w-7xl overflow-hidden space-y-6">
			<Card>
				<CardHeader className="gap-6">
					<CardTitle>Course Analysis</CardTitle>
					<div className="flex items-center">
						<CourseMarkers title="IT Law" text="60 hours" markerColor="red" />
					</div>
				</CardHeader>
				<CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="space-y-6">
						<ChartContainer config={chartConfig}>
							<BarChart accessibilityLayer data={chartData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent indicator="dashed" />}
								/>
								<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
								<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
							</BarChart>
						</ChartContainer>

						<footer className="flex-col items-start space-y-2.5 text-sm">
							<div className="flex gap-2.5 font-medium leading-none">
								Trending up by 5.2% this month{" "}
								<ArrowTrendingUpIcon className="h-4 w-4" />
							</div>
							<div className="leading-none text-muted-foreground">
								Showing some stats for courses taken
							</div>
						</footer>
					</div>
					<Card className="lg:col-span-2">
						<CardHeader className="gap-3 pb-3">
							<h3 className="text-xl font-medium">Last active course</h3>
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
							<Button className="bg-[#EDF495] text-lime-900">
								View course
							</Button>
						</CardFooter>
					</Card>
				</CardContent>
				{/* <CardFooter className="flex-col items-start gap-2 text-sm">
					<div className="flex gap-2 font-medium leading-none">
						Trending up by 5.2% this month{" "}
						<ArrowTrendingUpIcon className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
						Showing total visitors for the last 6 months
					</div>
				</CardFooter> */}
			</Card>
			<h2 className="text-xl font-bold">My Courses</h2>
			<div className="flex flex-col md:flex-row sm:flex-wrap gap-6 sm:items-center ">
				{[
					{
						id: 1,
						courseTitle: "Artificial Intelligence",
						courseStartDate: "",
						courseProgress: 66,
					},
					{
						id: 2,
						courseTitle: "Introduction to Java",
						courseStartDate: "",
						courseProgress: 23,
					},
					{
						id: 3,
						courseTitle: "Web Development & Web Technologies",
						courseStartDate: "",
						courseProgress: 48,
					},
					{
						id: 4,
						courseTitle: "Algorithms & Data Structures",
						courseStartDate: "",
						courseProgress: 90,
					},
					{
						id: 5,
						courseTitle: "IT Law",
						courseStartDate: "",
						courseProgress: 6,
					},
				].map((c) => (
					<MyCourseCard
						key={c.id}
						courseTitle={c.courseTitle}
						courseStartDate={new Date()}
						courseProgress={c.courseProgress}
					>
						<div className="grid grid-cols-2 gap-3">
							<ModuleInfo
								text="30 lessons"
								icon={<CalendarDaysIcon className="size-5" />}
							/>
							<ModuleInfo
								text="67 hours"
								icon={<ClockIcon className="size-5" />}
							/>
							<ModuleInfo
								text="7 quizzes"
								icon={<BoltIcon className="size-5" />}
							/>
							<ModuleInfo
								text="5 course work"
								icon={<ClipboardDocumentIcon className="size-5" />}
							/>
						</div>
					</MyCourseCard>
				))}
			</div>
		</div>
	);
}

export function MyCourseCard({
	courseTitle,
	courseDescription,
	courseStartDate,
	courseProgress,
	className,
	children,
	themeColor,
}: {
	courseTitle: string;
	courseDescription?: string;
	courseStartDate?: Date | string;
	courseProgress: number;
	themeColor?: string;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<Card className="">
			<CardHeader className="flex flex-row justify-between items-center border-b border-b-gray-100">
				<div className="flex flex-col items-start">
					<CardTitle className="h-10 w-64 truncate">{courseTitle}</CardTitle>
					<CardDescription className="w-56 truncate">
						{courseDescription}
					</CardDescription>
					<p className="text-xs text-gray-500">
						{`Started on ${Intl.DateTimeFormat("en-GH", {
							dateStyle: "medium",
						}).format(courseStartDate as Date)}`}
					</p>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<p className="sr-only">Course Action Menu</p>
						<EllipsisVerticalIcon className="size-5" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem asChild>
							<Link to="/">View</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link to="/">Remove</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<CardContent className="py-3 border-b border-b-gray-100">
				{children}
			</CardContent>
			<CardFooter className="pt-2.5">
				<ProgressCheck progress={courseProgress} progressColor="#AB82FE" />
			</CardFooter>
		</Card>
	);
}

export function ModuleInfo({
	text,
	icon,
}: { text: string; icon?: string | React.ReactNode }) {
	return (
		<>
			<span className="flex items-center gap-2.5">
				{icon} {text}
			</span>
		</>
	);
}

export function CourseMarkers({
	title,
	text,
	markerColor,
}: { title: string; text?: string; markerColor?: string }) {
	return (
		<div className="flex items-center gap-3">
			<span
				className="size-2 rounded-full"
				style={{ backgroundColor: markerColor ?? "#a411d9" }}
			/>
			<div className="flex flex-col">
				<h3 className="text-sm text-gray-500">{title}</h3>
				<p className="text-xl font-medium">{text}</p>
			</div>
		</div>
	);
}
