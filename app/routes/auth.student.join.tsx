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
	const firstName = formData.get("firstName");
	const lastName = formData.get("lastName");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmationpassword");

	return json({});
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
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

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
