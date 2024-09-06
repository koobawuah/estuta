import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorEarnings() {
	return (
		<>
			<h1>Earnings</h1>
		</>
	);
}
