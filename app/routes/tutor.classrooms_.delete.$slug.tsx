import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { slug } = params;
	console.log("Deleting: ", slug);

	return json({ status: "ok" });
}

// export default function DeleteClassroom() {
// 	return <p>Deleting classroom...</p>;
// }
