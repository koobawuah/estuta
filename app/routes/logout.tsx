import { getSession, sessionStorage } from "@/session.server";
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request);
	console.log("some", session);

	return redirect("/auth");
}

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request);

	return redirect("/auth", {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	});
}
