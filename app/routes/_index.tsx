import * as siteConfig from "@/site.json";
import { title } from "@/config.shared";
import { getUserId } from "@/session.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: title() },
		{ name: "description", content: siteConfig.description },
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (userId) return redirect("/student");

	return json({});
};

export default function Index() {
	return (
		<main className="container prose py-8">
			<h1 className="font-bold text-lg">{siteConfig.name}</h1>
			<ul className="list-none">
				<li>
					<a href="/auth/student">Login in as Student</a>
				</li>
			</ul>
		</main>
	);
}
