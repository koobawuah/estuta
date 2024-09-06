import { Link } from "@remix-run/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function CourseCard({
	courseTitle,
	courseTutor,
	courseTutorImg,
	courseDescription,
	courseCateogory,
	coursePrice,
	courseDuration,
	publishedAt,
	link,
	payLink,
}: {
	courseTitle: string;
	courseTutor: string;
	courseTutorImg?: string;
	courseDescription: string;
	courseCateogory: string[] | string;
	coursePrice: string | number;
	courseDuration: number;
	publishedAt: Date | string;
	link: string;
	payLink: string | URL;
}) {
	return (
		<Link to={link} className="flex flex-row">
			<div className="w-full relative block overflow-hidden bg-white rounded-l-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
				<span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />

				<div className="sm:flex sm:justify-between sm:gap-4">
					<div>
						<h3 className="text-lg font-bold text-gray-900 sm:text-xl">
							{courseTitle}
						</h3>

						<p className="mt-1 text-xs font-medium text-gray-600">
							By {courseTutor}
						</p>

						<div className="mt-2.5 gap-2.5 flex flex-row flex-wrap">
							{courseCateogory.length > 0 ? (
								(courseCateogory as string[]).map((cat: string) => (
									<Badge className="text-[10px]" key={cat}>
										{cat}
									</Badge>
								))
							) : (
								<Badge className="text-[10px]">{courseCateogory}</Badge>
							)}
						</div>
					</div>

					<div className="hidden sm:block sm:shrink-0">
						<img
							alt="Estuta | Tutor profile shot"
							src={
								courseTutorImg ??
								"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
							}
							className="size-16 rounded-lg object-cover shadow-sm"
						/>
					</div>
				</div>

				<div className="mt-4">
					<p className="w-3/4 max-w-[580px] text-pretty text-sm text-gray-500">
						{courseDescription}
					</p>
				</div>

				<dl className="my-3 flex flex-col justify-between space-y-6 md:flex-row">
					<div className="flex flex-1 gap-4 sm:gap-6">
						<div className="flex flex-col-reverse">
							<dt className="text-sm font-medium text-gray-600">Published</dt>
							<dd className="text-xs text-gray-500">
								{Intl.DateTimeFormat("en-GH", { dateStyle: "long" }).format(
									publishedAt as Date,
								)}
							</dd>
						</div>

						<div className="flex flex-col-reverse">
							<dt className="text-sm font-medium text-gray-600">Duration</dt>
							<dd className="text-xs text-gray-500">{`${courseDuration} hours`}</dd>
						</div>
					</div>
					<div className="">
						<Button onClick={() => window.open(payLink)} className="">
							{(coursePrice as number) > 10000
								? `Enroll for
							${Intl.NumberFormat("en-GH", {
								currency: "GHS",
								style: "currency",
								unitDisplay: "short",
								compactDisplay: "short",
							}).format(coursePrice as number)}`
								: `Enroll for
							${Intl.NumberFormat("en-GH", {
								currency: "GHS",
								style: "currency",
							}).format(coursePrice as number)}`}
						</Button>
					</div>
				</dl>
			</div>
		</Link>
	);
}
