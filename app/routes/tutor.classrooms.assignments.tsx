import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function Assignments() {
	return <div className="">Assignments</div>;
}
