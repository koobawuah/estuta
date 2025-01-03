import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from "@remix-run/node";
import { getUserId } from "@/session.server";
import * as siteMeta from "@/site.json";
import {
	Form,
	Link,
	useActionData,
	useNavigation,
	useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/primary-button";
import { users } from "@/models/user.server";

export const meta: MetaFunction = () => {
	return [
		{ title: `${siteMeta.name} | Forgot Password` },
		{ name: "description", content: siteMeta.description },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await getUserId(request);
	if (userId) return redirect("/student");

	return json({ status: "ok" });
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get("email") as string;

	console.log("Work with this email to recover account ", email);

	//talk to api

	const success = users.find((u) => u.email === email)?.email?.includes(email);
	const message = success
		? "Password reset link has been sent to your email!"
		: "Something went wrong, please try again later.";

	return json({
		status: 200,
		success: success && { message },
		errors: !success && "Something went wrong, Please try again.",
	});
}

export default function ForgotPassword() {
	const navigation = useNavigation();
	const actionData = useActionData<typeof action>();
	const emailRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (actionData?.success) {
			setTimeout(() => location.replace("/"), 6000);
		}
	}, [actionData]);

	return (
		<main className="w-full md:grid md:min-h-screen md:grid-cols-1">
			<div className="h-screen flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<Link to="/auth" className="">
							<span className="text-lg font-bold">{siteMeta.name}</span>
						</Link>
						<h1 className="text-3xl font-bold">Forgot Your Password?</h1>
					</div>
					<Form method="post" action="" className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
								ref={emailRef}
								autoComplete="email"
								className="w-full rounded border border-zinc-300 px-2 py-1 text-zinc-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-800 "
							/>
							{actionData?.success ? (
								<div className="pt-1 text-green-700" id="email-success">
									{actionData.success?.message}
								</div>
							) : actionData?.errors ? (
								<div className="pt-1 text-red-700" id="email-error">
									{actionData.errors}
								</div>
							) : (
								<span className="pt-7" />
							)}
						</div>
						<PrimaryButton
							type="submit"
							className="w-full bg-zinc-800 text-white rounded-md"
							isLoading={navigation.state === "submitting"}
						>
							Recover Password
						</PrimaryButton>
					</Form>
					<Link to="/auth/student" className=" inline-block text-sm underline">
						Remember your account details, Login?
					</Link>
				</div>
			</div>
		</main>
	);
}
