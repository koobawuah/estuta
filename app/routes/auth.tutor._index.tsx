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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrimaryButton from "@/components/primary-button";
import { safeRedirect } from "remix-utils/safe-redirect";
import { verifyLogin } from "@/models/user.server";
import { createUserSession, getUserId } from "@/session.server";
import { validateEmail } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (userId) return redirect("/tutor");

	return json({ success: "ok" });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const redirectTo = safeRedirect(formData.get("redirectTo"), "/tutor");
	const email = formData.get("email");
	const password = formData.get("password");
	const remember = formData.get("remember-me");

	if (!validateEmail(email)) {
		return json(
			{ errors: { email: "Email is invalid", password: null } },
			{ status: 400 },
		);
	}

	if (typeof password !== "string" || password.length === 0) {
		return json(
			{ errors: { email: null, password: "Password is required" } },
			{ status: 400 },
		);
	}

	if (password.length < 8) {
		return json(
			{ errors: { email: null, password: "Password is too short" } },
			{ status: 400 },
		);
	}

	const e = await verifyLogin(email);
	const p = "Admin_2024";

	const user = e && password === p ? e : undefined;
	// const user = email === e && password === p ? ({ id:'1', email: e, name: 'John', role: 'Admin', }) : null

	if (!user) {
		return json(
			{ errors: { email: "Invalid email or password", password: null } },
			{ status: 400 },
		);
	}

	return createUserSession({
		redirectTo,
		remember: remember === "on" ? true : false,
		request,
		userId: user.id,
	});
};

export const meta: MetaFunction = () => {
	return [
		{ title: `${siteMeta.name} | Sign into your Tutor account` },
		{ name: "description", content: siteMeta.description },
	];
};

export default function Index() {
	const [show, setShow] = useState(false);
	const [searchParams] = useSearchParams();
	const navigation = useNavigation();
	const redirectTo = searchParams.get("redirectTo") || "/auth/tutor";
	const actionData = useActionData<typeof action>();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// useEffect(() => {
	// 	if (actionData?.errors?.email) {
	// 		emailRef.current?.focus();
	// 	} else if (actionData?.errors?.password) {
	// 		passwordRef.current?.focus();
	// 	}
	// }, [actionData]);

	return (
		<main className="w-full md:min-h-screen ">
			{/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

			<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
				<aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-5">
					<img
						alt=""
						src="https://images.unsplash.com/photo-1722755417806-10e4c449e01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1870&q=80"
						className="absolute inset-0 h-full w-full object-cover"
					/>
				</aside>

				<main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-7">
					<div className="w-full max-w-md mx-auto">
						{/* <a className="block text-blue-600" href="/">
							<span className="sr-only">Home</span>
							<svg
								role="tree"
								className="h-8 sm:h-10"
								viewBox="0 0 28 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
									fill="currentColor"
								/>
							</svg>
						</a> */}

						<h1 className="mt-6 text-2xl font-bold text-emerald-700 sm:text-3xl md:text-4xl">
							Welcome back!
						</h1>

						<p className="mt-4 leading-relaxed text-gray-500">
							Sign in to continue
						</p>

						<Form method="post" className="w-full mt-8 grid gap-4">
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
									className="w-full rounded border border-zinc-300 px-2 py-1 text-zinc-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-800 "
								/>
								{actionData?.errors?.email ? (
									<div className="pt-1 text-red-700" id="email-error">
										{actionData.errors.email}
									</div>
								) : null}
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<div className="mt-1 relative">
									<Input
										name="password"
										id="password"
										type={show ? "text" : "password"}
										placeholder="***********"
										required
										ref={passwordRef}
										autoComplete="current-password"
										aria-invalid={
											actionData?.errors?.password ? true : undefined
										}
										aria-describedby="password-error"
										className="w-full rounded border border-zinc-300 px-2 py-1 text-zinc-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-800 "
									/>
									<div className="absolute p-2 inset-y-0 -right-2 flex items-center">
										<Button
											type="button"
											onClick={() => setShow((prev) => !prev)}
											variant="ghost"
											className="p-3 m-0 hover:bg-transparent"
										>
											{!show ? (
												<EyeIcon className="w-4 h-5 text-gray-500 " />
											) : (
												<EyeSlashIcon className="w-4 h-5 text-gray-500 " />
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
							<input type="hidden" name="redirectTo" value={redirectTo} />
							<div className="flex items-center">
								<input name="remember-me" type="checkbox" id="remember-me" />
								<Label htmlFor="remember-me" className="ml-2.5">
									Remember me
								</Label>
								<Link
									to="/forgot-password"
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link>
							</div>
							<PrimaryButton
								type="submit"
								className="w-full h-12 inline-block shrink-0 rounded-md border border-emerald-600 bg-emerald-600 px-12 py-3 text-sm font-medium text-emerald-50 transition hover:bg-transparent hover:text-emerald-600 focus:outline-none focus:ring active:text-emerald-500"
								isLoading={navigation.state === "submitting"}
							>
								Sign in
							</PrimaryButton>
							{/* <Button variant="outline" className="w-full">
								Login with Google
								</Button> */}
						</Form>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link to="/auth/tutor/join" className="underline">
								Sign up
							</Link>
						</div>
						<div className="mt-4 text-center text-sm">
							<Link to="/auth/student/join" className="underline">
								Join as a student!
							</Link>
						</div>
					</div>
				</main>
			</div>
		</main>
	);
}
