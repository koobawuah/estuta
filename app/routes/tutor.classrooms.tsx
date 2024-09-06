import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorClassrooms() {
	return (
		<>
			<h1>Classrooms</h1>
		</>
	);
}
