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
import { getSessionId } from "@/services/session.server";
// import { User } from "@/types/user.type";
import Layout from "@/components/Layout";
import {getUser} from "@/services/auth.server"
import {User} from "@/types/user.type"
// First, let's define proper types based on the API response

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const data: User| Response = await getUser(request)
	if (data instanceof Response) return data;
	return json(data);
};

export default function Index() {
	const data = useLoaderData<typeof loader>();
	const navigation = useNavigation();

	return (
		<Layout
			currUser={data} // No need for type assertion now
			currentLoggedInUser={data?.full_name?.slice(0, 1) ?? ""}
		>
			{data? (
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