import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
	redirect,
} from "@remix-run/node";
import { getSessionId } from "@/services/session.server";
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
import { forgotPassword } from "@/services/auth.server";
import { useToast } from "@/hooks/use-toast"

type ActionData = {
	success?: boolean;
	message?: string;
	errors?: {
		validation?: string;
		general?: string;
	};
};

export const meta: MetaFunction = () => {
	return [
		{ title: `${siteMeta.name} | Forgot Password` },
		{ name: "description", content: siteMeta.description },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await getSessionId(request);
	if (userId) return redirect("/student");

	return json({ status: "ok" });
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get("email") as string;

	const result = await forgotPassword(email);

	if (result.errors) {
		return json<ActionData>(result);
	}

	return json<ActionData>({
		success: true,
		message: "Password reset instructions have been sent to your email"
	});
}

export default function ForgotPassword() {
	const navigation = useNavigation();
	const actionData = useActionData<ActionData>();
	const emailRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();

	useEffect(() => {
		if (actionData?.success) {
			setTimeout(() => {
				location.replace("/auth/student");
			}, 60000);
		}
	}, [actionData]);

	return (
		<main className="w-full md:grid md:min-h-screen md:grid-cols-1">
			{actionData?.success && (
				<div 
					className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded animate-in fade-in slide-in-from-top-4 duration-300"
					style={{
						animation: 'fadeInOut 1s ease-in-out forwards'
					}}
				>
					<style>{`
						@keyframes fadeInOut {
							0% { opacity: 0; transform: translateY(-1rem); }
							2% { opacity: 1; transform: translateY(0); }
							80% { opacity: 1; }
							100% { opacity: 0; }
						}
					`}</style>
					<p>{actionData.message}</p>
				</div>
			)}
			<div className="h-screen flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<Link to="/auth/student" className="">
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
								className="w-full rounded border border-zinc-300 px-2 py-1 text-zinc-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-800"
							/>
							{actionData?.errors?.validation ? (
								<div className="pt-1 text-red-700" id="email-error">
									{actionData.errors.validation}
								</div>
							) : actionData?.errors?.general ? (
								<div className="pt-1 text-red-700" id="general-error">
									{actionData.errors.general}
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
					<Link to="/auth/student" className="inline-block text-sm underline">
						Remember your account details, Login?
					</Link>
				</div>
			</div>
		</main>
	);
}
