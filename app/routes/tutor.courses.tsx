import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorCourses() {
	return (
		<>
			<h1>Courses</h1>
		</>
	);
}
