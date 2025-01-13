import { getSession, sessionStorage } from "@/services/session.server";
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	redirect,
} from "@remix-run/node";
import {logout} from "@/services/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
	const data = logout(request)
	return data
}

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request);

	return redirect("/auth/student", {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	});
}
