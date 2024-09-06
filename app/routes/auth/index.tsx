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
	if (userId) return redirect("/student");

	return json({ success: "ok" });
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const remember = formData.get("remember-me");
	const redirectTo = safeRedirect(formData.get("redirectTo"), "/student");
	const show = { email, password, remember };
	// console.log("Obj", show);

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
		{ title: `${siteMeta.name} | Sign in` },
		{ name: "description", content: siteMeta.description },
	];
};

export default function Index() {
	const [show, setShow] = useState(false);
	const [searchParams] = useSearchParams();
	const navigation = useNavigation();
	const redirectTo = searchParams.get("redirectTo") || "/student";
	const actionData = useActionData<typeof action>();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (actionData?.errors?.email) {
			emailRef.current?.focus();
		} else if (actionData?.errors?.password) {
			passwordRef.current?.focus();
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
					<h2 className="text-3xl font-bold">Welcome back!</h2>
					<p className="text-base">Sign in to continue</p>
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
						<Link to="/auth" className="md:hidden">
							<span className="text-lg font-bold">estuta</span>
						</Link>
						<h1 className="text-3xl font-bold">Login</h1>
					</div>
					<Form method="post" className="grid gap-4">
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
									aria-invalid={actionData?.errors?.password ? true : undefined}
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
							className="w-full text-white rounded-md bg-gray-900"
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
						<Link to="#" className="underline">
							Sign up
						</Link>
					</div>
					<div className="mt-4 text-center text-sm">
						<Link to="#" className="underline">
							Become a tutor
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
