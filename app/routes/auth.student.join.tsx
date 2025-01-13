import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from "@remix-run/node";
import * as siteMeta from "@/site.json";
import {
	Form,
	Link,
	useActionData,
	useNavigation,
	useSearchParams,
} from "@remix-run/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrimaryButton from "@/components/primary-button";
import { safeRedirect } from "remix-utils/safe-redirect";
import { verifyLogin } from "@/models/user.server";
import { createUserSession, getSessionId } from "@/services/session.server";
import { validateEmail } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/styles";
import {User} from "@/types/user.type";
import {getUser, emailPassRegister} from "@/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	return json({ success: "ok" });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const firstName = formData.get("firstName");
	const lastName = formData.get("lastName");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmationpassword");
	const redirectTo = formData.get("redirectTo") || "/student";

	if (typeof firstName !== "string" || firstName.length === 0) {
		return json(
			{ errors: { firstName: "First name is required" } },
			{ status: 400 }
		);
	}

	if (typeof lastName !== "string" || lastName.length === 0) {
		return json(
			{ errors: { lastName: "Last name is required" } },
			{ status: 400 }
		);
	}

	if (!validateEmail(email)) {
		return json(
			{ errors: { email: "Email is invalid" } },
			{ status: 400 }
		);
	}

	if (typeof password !== "string" || password.length < 8) {
		return json(
			{ errors: { password: "Password must be at least 8 characters" } },
			{ status: 400 }
		);
	}

	if (password !== confirmPassword) {
		return json(
			{ errors: { confirmPassword: "Passwords do not match" } },
			{ status: 400 }
		);
	}

	const result = await emailPassRegister({
		email: email as string,
		password: password as string,
		firstName: firstName as string,
		lastName: lastName as string,
		redirectTo: redirectTo as string,
	});
	if (result instanceof Response) return result;
	//the sign up is suppose to redirect so if it gets here just return error
	console.log(result)
	return json(result);

};

export const meta: MetaFunction = () => {
	return [
		{ title: `${siteMeta.name} | Sign in` },
		{ name: "description", content: siteMeta.description },
	];
};

export default function StudentJoin() {
	const [show, setShow] = useState(false);
	const [searchParams] = useSearchParams();
	const navigation = useNavigation();
	const redirectTo = searchParams.get("redirectTo") || "/student";
	const actionData = useActionData<typeof action>();
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (actionData?.errors?.firstName) {
			firstNameRef.current?.focus();
		} else if (actionData?.errors?.lastName) {
			lastNameRef.current?.focus();
		} else if (actionData?.errors?.email) {
			emailRef.current?.focus();
		} else if (actionData?.errors?.password) {
			passwordRef.current?.focus();
		} else if (actionData?.errors?.confirmPassword) {
			confirmPasswordRef.current?.focus();
		}
	}, [actionData]);

	return (
		<main className="w-full md:grid md:min-h-screen md:grid-cols-2">
			<div className="hidden bg-muted rounded-r-xl shadow-xl md:h-full md:flex md:flex-col justify-between md:p-6">
				<Link to="/auth">
					<span className="text-lg font-bold">estuta</span>
				</Link>
				<div className="container prose">
					<h2 className="text-3xl font-bold">Hello,</h2>
					<h2 className="text-3xl font-bold">Welcome to Estuta!</h2>
					<p className="text-base">
						Learning new skills and gaining knowledge with the best tutors and
						courses!
					</p>
				</div>
				<div className="py-6">
					<span>
						<Link to="/">estuta </Link> &copy; {new Date().getFullYear()}
					</span>
				</div>
			</div>
			<div className="h-screen flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<Link to="/auth/student" className="md:hidden">
							<span className="text-lg font-bold">estuta</span>
						</Link>
						<h1 className="text-3xl font-bold">Sign up</h1>
					</div>
					<Form method="post" className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								name="firstName"
								type="text"
								placeholder="John"
								required
								ref={firstNameRef}
								aria-invalid={actionData?.errors?.firstName ? true : undefined}
								className={`w-full rounded border px-2 py-1 text-lg ${
									actionData?.errors?.firstName ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{actionData?.errors?.firstName ? (
								<div className="pt-1 text-red-700" id="firstName-error">
									{actionData.errors.firstName}
								</div>
							) : null}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								name="lastName"
								type="text"
								placeholder="Doe"
								required
								ref={lastNameRef}
								aria-invalid={actionData?.errors?.lastName ? true : undefined}
								className={`w-full rounded border px-2 py-1 text-lg ${
									actionData?.errors?.lastName ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{actionData?.errors?.lastName ? (
								<div className="pt-1 text-red-700" id="lastName-error">
									{actionData.errors.lastName}
								</div>
							) : null}
						</div>

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
								aria-invalid={actionData?.errors?.email ? true : undefined}
								className={`w-full rounded border px-2 py-1 text-lg ${
									actionData?.errors?.email ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{actionData?.errors?.email ? (
								<div className="pt-1 text-red-700" id="email-error">
									{actionData.errors.email}
								</div>
							) : null}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<div className="mt-1 relative">
								<Input
									id="password"
									name="password"
									type={show ? "text" : "password"}
									placeholder="***********"
									required
									ref={passwordRef}
									aria-invalid={actionData?.errors?.password ? true : undefined}
									className={`w-full rounded border px-2 py-1 text-lg ${
										actionData?.errors?.password ? "border-red-500" : "border-gray-300"
									}`}
								/>
								<div className="absolute p-2 inset-y-0 -right-2 flex items-center">
									<Button
										type="button"
										onClick={() => setShow((prev) => !prev)}
										variant="ghost"
										className="p-3 m-0 hover:bg-transparent"
									>
										{!show ? (
											<EyeIcon className="w-4 h-5 text-gray-500" />
										) : (
											<EyeSlashIcon className="w-4 h-5 text-gray-500" />
										)}
									</Button>
								</div>
							</div>
							{actionData?.errors?.password ? (
								<div className="pt-1 text-red-700" id="password-error">
									{actionData.errors.password}
								</div>
							) : null}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="confirmationpassword">Confirm Password</Label>
							<Input
								id="confirmationpassword"
								name="confirmationpassword"
								type="password"
								placeholder="***********"
								required
								ref={confirmPasswordRef}
								aria-invalid={actionData?.errors?.confirmPassword ? true : undefined}
								className={`w-full rounded border px-2 py-1 text-lg ${
									actionData?.errors?.confirmPassword ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{actionData?.errors?.confirmPassword ? (
								<div className="pt-1 text-red-700" id="confirmPassword-error">
									{actionData.errors.confirmPassword}
								</div>
							) : null}
						</div>

						<input type="hidden" name="redirectTo" value={redirectTo} />

						<PrimaryButton
							type="submit"
							className="w-full text-white rounded-md bg-gray-900"
							isLoading={navigation.state === "submitting"}
						>
							Sign up
						</PrimaryButton>

						<Button variant="outline" className="w-full">
							Login with Google
						</Button>
					</Form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link to="/auth/student" className="underline">
							Sign in
						</Link>
					</div>
					<div className="mt-4 text-center text-sm">
						<Link to="/auth/tutor/join" className="underline">
							Become a tutor
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
