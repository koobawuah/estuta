import { Outlet } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { TopLayout } from "@/components/tutor/TopLayout";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function Index() {
	return (
		<TopLayout>
			<Outlet />
		</TopLayout>
	);
}
