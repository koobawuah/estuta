import PrimaryButton from "@/components/primary-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/styles";
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
import { getUserId } from "@/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await getUserId(request);
	if (userId) return redirect("/student");

	return json({ status: "ok" });
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const newPass = formData.get("new-password");
	const confirmPass = formData.get("confirm-password");
	const reference = formData.get("reference");

	console.log(
		"Work with the following; \n",
		`${reference}, ${newPass} and ${confirmPass}`,
	);
	if (!reference) return redirect("/");

	if (
		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
			newPass?.toString() || "",
		)
	) {
		return json({
			errors: {
				password:
					"Password must contain at least; one uppercase letter, one lowercase letter, one number, one special character",
				message: "",
			},
		});
	}
	if (newPass !== confirmPass)
		return json({
			errors: {
				password: "Passwords do not match",
				message: "",
			},
		});

	//talk to api
	const verified = false;

	//On verification and successful change of password redirect to login
	const success = newPass && confirmPass && reference && verified; //back from the api
	if (success) {
		return redirect("/");
	}

	return json({
		errors: {
			password: "",
			message: "Something went wrong, please try again.",
		},
	});
}

export default function ResetPassword() {
	const [show, setShow] = useState(false);
	const [searchParams] = useSearchParams();
	const reference = searchParams.get("reference");
	const navigation = useNavigation();
	const actionData = useActionData<typeof action>();
	const passwordRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (actionData?.errors?.password) {
			passwordRef.current?.focus();
		}
	}, [actionData]);

	return (
		<main className="w-full md:grid md:min-h-screen md:grid-cols-1">
			{/* <div className="hidden bg-muted rounded-r-xl shadow-xl md:h-full md:flex md:flex-col justify-between md:p-6">
				<Link to="/auth/student">
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
			</div> */}
			<div className="h-screen flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<Link to="/auth" className="">
							<span className="text-lg font-bold">{siteMeta.name}</span>
						</Link>
						<h1 className="text-3xl font-bold">Account Reset</h1>
					</div>
					<Form method="post" className="grid gap-4">
						<div className="grid gap-2.5">
							<div className="flex items-center">
								<Label htmlFor="new-password">New Password</Label>
							</div>
							<div className="mt-1 relative">
								<Input
									name="new-password"
									id="new-password"
									type={show ? "text" : "password"}
									placeholder="***********"
									required
									ref={passwordRef}
									autoComplete="current-password"
									aria-invalid={actionData?.errors?.password ? true : undefined}
									aria-describedby="password-error"
									className="w-full rounded border border-zinc-300 px-2 py-1 text-zinc-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-800 "
								/>
							</div>
							<div>
								<Label htmlFor="confirm-password">Confirm Password</Label>
							</div>
							<div className="mt-1 relative">
								<Input
									name="confirm-password"
									id="confirm-password"
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
										onClick={() => setShow((prev: boolean) => !prev)}
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
						</div>
						<input
							hidden
							name="reference"
							value={reference ? reference : ""}
							className="sr-only"
							readOnly
						/>

						<div className="flex items-center">
							{actionData?.errors?.password ? (
								<div className="pt-1 text-red-700" id="password-error">
									{actionData.errors.password}
								</div>
							) : actionData?.errors?.message ? (
								<div className="pt-1 text-red-700" id="password-error">
									{actionData.errors.message}
								</div>
							) : (
								<span className="pt-7" />
							)}
						</div>

						<PrimaryButton
							type="submit"
							className="w-full text-white rounded-md bg-zinc-800"
							isLoading={navigation.state === "submitting"}
						>
							Submit
						</PrimaryButton>
					</Form>
				</div>
			</div>
		</main>
	);
}
