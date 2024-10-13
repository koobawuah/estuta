import { Button } from "@/components/ui/button";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const newClassroomSchema = z.object({
	title: z.string().min(3).max(50),
	description: z.string().min(10).max(250),
	session: z.enum(["morning", "afternoon"]),
	duration: z.string(),
	rate: z.string().min(1),
});

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function NewClassroom() {
	const linkBtn = useRef<HTMLButtonElement | null>(null);
	// 1. Define your form.
	const classroomForm = useForm<z.infer<typeof newClassroomSchema>>({
		resolver: zodResolver(newClassroomSchema),
		defaultValues: {
			title: "",
			description: "",
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

	const copyShareableLink = () => {
		linkBtn.current?.addEventListener("click", () => {
			// Get the text content of the button
			const buttonText = linkBtn.current?.textContent;

			// Use the Clipboard API to copy the text to the clipboard
			navigator.clipboard
				.writeText(buttonText as string)
				.then(() => {
					// Optionally, notify the user that the text has been copied
					toast(`Text copied to clipboard: ${buttonText as string}`);
				})
				.catch((err) => {
					console.error("Error copying text: ", err);
				});
		});
		return () =>
			linkBtn.current?.removeEventListener("click", copyShareableLink);
	};

	return (
		<div className="max-w-6xl mx-auto w-full space-y-5">
			<div className="flex flex-row justify-between">
				<aside className="">
					<h2 className="font-bold text-2xl">Create New Classroom</h2>
					<p className="font-normal text-base">
						Add inforamtion about the new classroom.
					</p>
				</aside>
				<div className="hidden md:block">
					<p className="text-sm">Share Link to Classroom</p>
					<Button
						id="shareableLink"
						ref={linkBtn}
						variant="outline"
						className="-ml-2.5 cursor-pointer rounded-full"
						onClick={copyShareableLink}
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
											Time of the day where most lessons take place
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
										<FormLabel>Classroom Duration</FormLabel>
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
										<FormLabel>Classroom Price</FormLabel>
										<FormControl>
											<Input placeholder="GHS1,500" {...field} />
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
