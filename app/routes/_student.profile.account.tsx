import { users } from "@/models/user.server";
import { getUserId } from "@/session.server";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form as RmxForm } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import PrimaryBtn from "@/components/primary-button";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

export const accountUpdateSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "First name must be more than 2 characters" })
		.max(100, { message: "First name cannot be more than 100 characters" }),
	lastName: z
		.string()
		.min(2, { message: "Last name must be more than 2 characters" })
		.max(100, { message: "Last name cannot be more than 100 characters" }),
	email: z.string().email(),
});

export default function Account() {
	const accountUpdateForm = useForm<z.infer<typeof accountUpdateSchema>>({
		resolver: zodResolver(accountUpdateSchema),
		defaultValues: {
			firstName: "Kwame",
			lastName: "Ampofo",
			email: "a@admin.com",
		},
	});

	function onSubmit(data: z.infer<typeof accountUpdateSchema>) {
		console.log("Data here ", data);
	}

	return (
		<div className="relative flex flex-col">
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Account</CardTitle>
					<CardDescription>
						Make edits and updates to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="py-6">
					<Form {...accountUpdateForm}>
						<RmxForm
							onSubmit={accountUpdateForm.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={accountUpdateForm.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="Your first name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={accountUpdateForm.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Your last name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={accountUpdateForm.control}
								name="email"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Your email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<PrimaryBtn
								type="submit"
								icon={<PencilSquareIcon className="size-5" />}
								className="text-white text-xs font-medium bg-purple-800 rounded-lg "
							>
								Update Account
							</PrimaryBtn>
						</RmxForm>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
