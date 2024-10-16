import {
	AcademicCapIcon,
	ArchiveBoxIcon,
	BanknotesIcon,
	ChevronDownIcon,
	ClipboardDocumentCheckIcon,
	UserIcon,
	VariableIcon,
} from "@heroicons/react/24/outline";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorAccount() {
	return (
		<div className="max-w-6xl mx-auto w-full space-y-5">
			<div className="flex flex-col">
				<aside className="my-4">
					<h2 className="font-bold text-2xl">Account</h2>
				</aside>

				<div className="flex flex-row items-center justify-between">
					<ul className="flex space-x-6 md:mr-6">
						<li>
							<NavLink
								to="/tutor/account"
								end
								className={({ isActive }) =>
									isActive
										? "px-4 py-2 font-medium text-emerald-500 border-b-2 border-b-emerald-500 flex items-center"
										: "px-4 py-2 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-emerald-500 transition flex flex-row items-center"
								}
							>
								<UserIcon className="size-4 mr-1.5" />
								My Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/tutor/account/earnings"
								className={({ isActive }) =>
									isActive
										? "px-4 py-2 font-medium text-emerald-500 border-b-2 border-b-emerald-500 flex items-center"
										: "px-4 py-2 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-emerald-500 transition flex flex-row items-center"
								}
							>
								<BanknotesIcon className="size-4 mr-1.5" />
								Earnings
							</NavLink>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	);
}
