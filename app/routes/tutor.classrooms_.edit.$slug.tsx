import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/styles";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useLoaderData, useMatches } from "@remix-run/react";
import { copyShareableLink, getBreadcrumbs } from "@/lib/utils";
import { Breadcrumb, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Breadcrumbs } from "@/components/tutor/breadcrumbs";

const newClassroomSchema = z.object({
	title: z.string().min(3).max(50),
	description: z.string().min(10).max(250),
	session: z.enum(["morning", "afternoon"]),
	startDate: z.date() || z.string(),
	duration: z.string(),
	rate: z.string().min(1),
});

export async function loader({ request, params }: LoaderFunctionArgs) {
	const location = params;

	return json({ location });
}

export const handle = {
	breadcrumb: () => <BreadcrumbLink href="edit/">Edit</BreadcrumbLink>,
};

export default function EditClassroom() {
	const { location } = useLoaderData<typeof loader>();
	const crumbs = useMatches();
	const { slug } = location;

	const linkBtn = useRef<HTMLButtonElement | null>(null);
	// 1. Define your form.
	const classroomForm = useForm<z.infer<typeof newClassroomSchema>>({
		resolver: zodResolver(newClassroomSchema),
		defaultValues: {
			title: "",
			description: "",
			startDate: new Date(),
			duration: "",
			rate: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof newClassroomSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="max-w-6xl mx-auto w-full space-y-5">
			<Breadcrumbs routes={getBreadcrumbs(crumbs)} />
			<div className="flex flex-row justify-between">
				<aside className="">
					<h2 className="font-bold text-2xl">Edit {slug} classroom</h2>
					<p className="font-normal text-base">
						Edit inforamtion about the classroom.
					</p>
				</aside>
				<div className="hidden md:block">
					<p className="text-sm">Share Link to Classroom</p>
					<Button
						id="shareableLink"
						ref={linkBtn}
						variant="outline"
						className="-ml-2.5 cursor-pointer rounded-full"
						onClick={copyShareableLink(linkBtn)}
					>
						https://estuta.com/classroom/xsuqpow
					</Button>
				</div>
			</div>
			<div className="py-8">
				<Form {...classroomForm}>
					<form
						onSubmit={classroomForm.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							control={classroomForm.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Classroom Name:</FormLabel>
									<FormControl>
										<Input placeholder="Nursing Class" {...field} />
									</FormControl>
									<FormDescription>
										This name is publicly displayed as the classrooms name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={classroomForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Classroom Description:</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us a little bit about the classroom"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* <div className="flex flex-col space-y-2.5 md:flex-row md:items-center md:space-y-0 md:space-x-2.5"> */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							<FormField
								control={classroomForm.control}
								name="startDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Classroom Start Date:</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full pl-3 text-left font-normal",
															!field.value && "text-muted-foreground",
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Select a start date</span>
														)}
														<CalendarDateRangeIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date < new Date() || date < new Date("1900-01-01")
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormDescription>
											A start date for the official time to begin the lessons in
											a classroom.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={classroomForm.control}
								name="session"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Select Classroom Session:</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a classroom session" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{["Morning", "Afternoon"].map((value, idx) => (
													<SelectItem
														key={idx + value}
														value={value.toLowerCase()}
														className="capitalize"
													>
														{value}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Time of the day when the lessons take place.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={classroomForm.control}
								name="duration"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Classroom Duration:</FormLabel>
										<FormControl>
											<Input placeholder="30 days" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={classroomForm.control}
								name="rate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Classroom Price(GHS):</FormLabel>
										<FormControl>
											<Input placeholder="1500" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
