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
	Outlet,
	useActionData,
	useLoaderData,
	useNavigation,
	useSearchParams,
} from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PrimaryButton from "@/components/primary-button";
import { safeRedirect } from "remix-utils/safe-redirect";
import { users, verifyLogin } from "@/models/user.server";
import { validateEmail } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getUserId } from "@/session.server";
import { User } from "@/types/user.type";
import Layout from "@/components/Layout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

export const action = async ({ request }: ActionFunctionArgs) => {};

export const meta: MetaFunction = () => {
	return [
		{ title: `${siteMeta.name} | Student Dashboard` },
		{ name: "description", content: siteMeta.description },
	];
};

export default function Index() {
	const { user } = useLoaderData<typeof loader>();
	const navigation = useNavigation();
	const actionData = useActionData<typeof action>();

	return (
		<Layout
			currUser={user as unknown as User}
			currentLoggedInUser={user?.name?.slice(0, 1) ?? ""}
		>
			{user ? (
				<div className="my-3">
					<Outlet />
				</div>
			) : (
				<main className="w-full h-[800px] flex justify-center items-center">
					<p className="text-md text-zinc-500">
						Sorry, you don't have access to this page.
					</p>
				</main>
			)}
		</Layout>
	);
}
