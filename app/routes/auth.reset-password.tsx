import PrimaryButton from "@/components/primary-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import {
	Form,
	Link,
	useActionData,
	useNavigation,
	useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import * as siteMeta from "@/site.json";
import { resetPassword } from "@/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const token = new URL(request.url).searchParams.get("token");
	if (!token) {
		return redirect("/auth/student");
	}
	return json({ status: "ok" });
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const newPass = formData.get("new-password") as string;
	const confirmPass = formData.get("confirm-password") as string;
	const token = formData.get("token") as string;

	if (
		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
			newPass
		)
	) {
		return json({
			errors: {
				password:
					"Password must contain at least: one uppercase letter, one lowercase letter, one number, one special character",
				message: "",
			},
		});
	}

	if (newPass !== confirmPass) {
		return json({
			errors: {
				password: "Passwords do not match",
				message: "",
			},
		});
	}

	const result = await resetPassword(token, newPass);

	if (result.errors) {
		return json({
			errors: {
				password: "",
				message: result.errors.general || "Something went wrong, please try again.",
			},
		});
	}

	return redirect("/auth/student");
}

export default function ResetPassword() {
	const [showPassword, setShowPassword] = useState(false);
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const navigation = useNavigation();
	const actionData = useActionData<typeof action>();
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (actionData?.errors?.password) {
			newPasswordRef.current?.focus();
		}
	}, [actionData]);

	if (!token) {
		return <div>Invalid or missing reset token</div>;
	}

	return (
		<main className="w-full md:min-h-screen">
			<div className="flex h-screen items-center justify-center py-12">
				<div className="mx-auto w-[350px] space-y-6">
					<div className="text-center space-y-2">
						<Link to="/auth/student">
							<span className="text-lg font-bold">{siteMeta.name}</span>
						</Link>
						<h1 className="text-3xl font-bold">Account Reset</h1>
					</div>

					<Form method="post" className="space-y-4">
						<div className="space-y-2.5">
							<div>
								<Label htmlFor="new-password">New Password</Label>
								<div className="relative">
									<Input
										ref={newPasswordRef}
										name="new-password"
										id="new-password"
										type={showPassword ? "text" : "password"}
										placeholder="***********"
										required
										autoComplete="new-password"
										aria-invalid={actionData?.errors?.password ? true : undefined}
										aria-describedby="password-error"
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="confirm-password">Confirm Password</Label>
								<div className="relative">
									<Input
										ref={confirmPasswordRef}
										name="confirm-password"
										id="confirm-password"
										type={showPassword ? "text" : "password"}
										placeholder="***********"
										required
										autoComplete="new-password"
										aria-invalid={actionData?.errors?.password ? true : undefined}
										aria-describedby="password-error"
									/>
									<div className="absolute inset-y-0 right-0 flex items-center">
										<Button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											variant="ghost"
											className="h-full px-2 hover:bg-transparent"
										>
											{showPassword ? (
												<EyeSlashIcon className="h-4 w-4 text-gray-500" />
											) : (
												<EyeIcon className="h-4 w-4 text-gray-500" />
											)}
										</Button>
									</div>
								</div>
							</div>
						</div>

						<input type="hidden" name="token" value={token} />

						{(actionData?.errors?.password || actionData?.errors?.message) && (
							<div className="text-red-700" id="password-error">
								{actionData.errors.password || actionData.errors.message}
							</div>
						)}

						<PrimaryButton
							type="submit"
							className="w-full bg-zinc-800 text-white"
							isLoading={navigation.state === "submitting"}
						>
							Reset Password
						</PrimaryButton>
					</Form>
				</div>
			</div>
		</main>
	);
}