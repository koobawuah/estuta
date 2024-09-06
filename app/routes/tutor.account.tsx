import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorAccount() {
	return (
		<>
			<h1>Account</h1>
		</>
	);
}
