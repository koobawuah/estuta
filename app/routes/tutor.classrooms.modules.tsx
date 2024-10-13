import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function Modules() {
	return <div className="">Modules</div>;
}
