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
import { validateEmail } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/styles";
import { getUser, emailPassLogin } from "@/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await getUser(request);
	if (user?.id) return redirect("/student");
	return json({});
};

interface ActionError {
	email?: string | null;
	password?: string | null;
	auth?: string | null;
	general?: string | null;
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const redirectTo = safeRedirect(formData.get("redirectTo"), "/student");

	const errors: ActionError = {};

	if (!validateEmail(email)) {
		errors.email = "Please enter a valid email address";
	}

	if (typeof password !== "string") {
		errors.password = "Password is required";
	} else if (password.length < 8) {
		errors.password = "Password must be at least 8 characters";
	}

	if (Object.keys(errors).length > 0) {
		return json({ errors }, { status: 400 });
	}

	const result = await emailPassLogin({
		email: email as string,
		password: password as string,
		redirectTo,
	});

	if ("errors" in result) {
		return json({
			errors: {
				email: null,
				password: null,
				auth: result.errors.auth || null,
				general: result.errors.general || result.errors.validation || null,
			},
		}, { status: 400 });
	}

	return result;
};

export const meta: MetaFunction = () => {
	return [
		{ title: `${siteMeta.name} | Sign into your Student account` },
		{ name: "description", content: siteMeta.description },
	];
};

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
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

	const hasError = actionData?.errors?.auth || actionData?.errors?.general;

	return (
		<main className="w-full md:grid md:min-h-screen md:grid-cols-2">
			<div className="hidden bg-muted rounded-r-xl shadow-xl md:block md:h-full md:p-6 flex flex-col justify-between">
				<Link to="/auth/student">
					<span className="text-lg font-bold">{siteMeta.name}</span>
				</Link>
				<div className="container prose">
					<h2 className="text-3xl font-bold">Hello,</h2>
					<h2 className="text-3xl font-bold">Welcome back!</h2>
					<p className="text-base">Sign in to continue</p>
				</div>
				<div className="py-6">
          <span>
            <Link to="/">{siteMeta.name}</Link> &copy; {new Date().getFullYear()}
          </span>
				</div>
			</div>

			<div className="flex h-screen items-center justify-center py-12">
				<div className="mx-auto w-[350px] space-y-6">
					<div className="text-center space-y-2">
						<Link to="/auth/student" className="md:hidden">
							<span className="text-lg font-bold">{siteMeta.name}</span>
						</Link>
						<h1 className="text-3xl font-bold">Login</h1>
					</div>

					{hasError && (
						<div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
							{actionData?.errors.auth || actionData?.errors.general}
						</div>
					)}

					<Form method="post" className="space-y-4">
						<div className="space-y-2">
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
								aria-describedby={actionData?.errors?.email ? "email-error" : undefined}
							/>
							{actionData?.errors?.email && (
								<div className="text-sm text-red-700" id="email-error">
									{actionData.errors.email}
								</div>
							)}
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Link
									to="/auth/forgot-password"
									className="text-sm text-muted-foreground hover:underline"
								>
									Forgot password?
								</Link>
							</div>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									required
									ref={passwordRef}
									autoComplete="current-password"
									aria-invalid={actionData?.errors?.password ? true : undefined}
									aria-describedby={actionData?.errors?.password ? "password-error" : undefined}
								/>
								<Button
									type="button"
									variant="ghost"
									className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeSlashIcon className="h-4 w-4 text-gray-500" />
									) : (
										<EyeIcon className="h-4 w-4 text-gray-500" />
									)}
								</Button>
							</div>
							{actionData?.errors?.password && (
								<div className="text-sm text-red-700" id="password-error">
									{actionData.errors.password}
								</div>
							)}
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="remember-me"
								name="remember-me"
								className="h-4 w-4 rounded border-gray-300"
							/>
							<Label htmlFor="remember-me">Remember me</Label>
						</div>

						<input type="hidden" name="redirectTo" value={redirectTo} />

						<PrimaryButton
							type="submit"
							className="w-full bg-purple-500 text-white"
							isLoading={navigation.state === "submitting"}
						>
							Sign in
						</PrimaryButton>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
							</div>
						</div>

						<Link
							to=""
							className={cn(
								buttonVariants({ variant: "outline" }),
								"w-full"
							)}
						>
							<img
								className="mr-2 h-5 w-5"
								src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png"
								alt="Google"
							/>
							Google
						</Link>

						<p className="text-center text-sm text-muted-foreground">
							Don't have an account?{" "}
							<Link
								to="/auth/student/join"
								className="font-medium text-primary hover:underline"
							>
								Sign up
							</Link>
						</p>

						<div className="text-center">
							<Link
								to="/auth/tutor/join"
								className="text-sm text-muted-foreground hover:underline"
							>
								Become a tutor
							</Link>
						</div>
					</Form>
				</div>
			</div>
		</main>
	);
}