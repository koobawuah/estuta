import { Breadcrumbs } from "@/components/tutor/breadcrumbs";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { copyShareableLink, getBreadcrumbs } from "@/lib/utils";
import { json } from "@remix-run/node";
import { useLocation, useMatches } from "@remix-run/react";
import { useRef } from "react";
import { sortUserPlugins } from "vite";

export async function loader() {
	return json({}, 200);
}

export default function ViewClassroom() {
	const location = useLocation();
	const slug = location.pathname;
	const crumbs = useMatches();
	const linkBtn = useRef<HTMLButtonElement | null>(null);
	return (
		<div className="max-w-6xl mx-auto w-full space-y-5">
			<Breadcrumbs routes={getBreadcrumbs(crumbs)} />
			<div className="flex flex-row justify-between">
				<aside className="">
					<h2 className="font-bold text-2xl">
						{slug.split("/").at(-1)} classroom
					</h2>
					<p className="font-normal text-base">
						Edit inforamtion about the classroom.
					</p>
				</aside>
				<div className="hidden md:block">
					<p className="text-sm">Share Link to Classroom</p>
					<Button
						id="shareableLink"
						ref={linkBtn}
						variant="outline"
						className="-ml-2.5 cursor-pointer rounded-full"
						onClick={copyShareableLink(linkBtn)}
					>
						https://estuta.com/classroom/xsuqpow
					</Button>
				</div>
			</div>
		</div>
	);
}

export const handle = {
	breadcrumb: (v: { link: string; name: string }) => (
		<BreadcrumbLink href={v.link}>{v.name}</BreadcrumbLink>
	),
};
