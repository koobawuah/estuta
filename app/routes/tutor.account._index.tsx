import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
	AcademicCapIcon,
	ArchiveBoxIcon,
	BanknotesIcon,
	ChevronDownIcon,
	ClipboardDocumentCheckIcon,
	UserIcon,
	VariableIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
	firstName: z.string().min(3).max(50),
	lastName: z.string().min(3).max(50),
	email: z.string().email().min(3).max(50),
});

const passwordSchema = z
	.object({
		oldPassword: z.string().min(8),
		newPassword: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function Index() {
	// 1. Define your form.
	const profileForm = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
		},
	});
	const passwordForm = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof profileSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	function passwordSubmit(values: z.infer<typeof passwordSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="max-w-6xl mx-auto w-full space-y-5">
			<main className="w-full flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<div className="mx-auto w-full flex max-w-6xl gap-6">
					<nav className="grid gap-4 text-sm text-muted-foreground">
						<form encType="" className="flex flex-col space-y-3">
							<Avatar className="w-32 h-32">
								<AvatarImage
									src=""
									alt="Tutor profile photo"
									className="object-cover"
								/>
								<AvatarFallback>JH</AvatarFallback>
							</Avatar>
							<input
								type="file"
								accept="jpeg"
								alt="Upload or Update profile photo"
							/>
							<Button
								variant="ghost"
								className="w-32 uppercase text-xs font-semibold"
							>
								Change Photo
							</Button>
						</form>
					</nav>
					<div className="flex-1 grid gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Profile Info</CardTitle>
								<CardDescription>
									Update your estuta profile identify here
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Form {...profileForm}>
									<form
										onSubmit={profileForm.handleSubmit(onSubmit)}
										className="space-y-8"
									>
										<FormField
											control={profileForm.control}
											name="firstName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>First Name:</FormLabel>
													<FormControl>
														<Input placeholder="Joseph" {...field} />
													</FormControl>
													<FormDescription>
														This name is publicly displayed as your name on
														estuta.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={profileForm.control}
											name="lastName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Last Name:</FormLabel>
													<FormControl>
														<Input placeholder="Hanson" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={profileForm.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email:</FormLabel>
													<FormControl>
														<Input
															placeholder="j.hanson@gmail.com"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</form>
								</Form>
							</CardContent>
							<CardFooter className="border-t px-6 py-4">
								<Button>Update Profile</Button>
							</CardFooter>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Change Password</CardTitle>
								<CardDescription>
									You can update your password if you have one. If you logged in
									with Google or Facebook, no need to worry about this.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Form {...passwordForm}>
									<form
										onSubmit={passwordForm.handleSubmit(passwordSubmit)}
										className="space-y-8"
									>
										<FormField
											control={passwordForm.control}
											name="oldPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Old Password:</FormLabel>
													<FormControl>
														<Input placeholder="************" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={passwordForm.control}
											name="newPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>New Password:</FormLabel>
													<FormControl>
														<Input placeholder="************" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={passwordForm.control}
											name="confirmPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Confirm New Password:</FormLabel>
													<FormControl>
														<Input placeholder="************" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</form>
								</Form>
							</CardContent>
							<CardFooter className="border-t px-6 py-4">
								<Button>Change Password</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
