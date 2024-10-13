import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	AcademicCapIcon,
	ArchiveBoxIcon,
	ArrowDownIcon,
	BuildingLibraryIcon,
	ChevronDownIcon,
	ClipboardDocumentCheckIcon,
	HomeIcon,
	VariableIcon,
} from "@heroicons/react/24/outline";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorClassrooms() {
	return (
		<div className="max-w-6xl mx-auto w-full space-y-5">
			<div className="flex flex-col">
				<aside className="my-4">
					<h2 className="font-bold text-2xl">Classrooms</h2>
				</aside>

				<div className="flex flex-row items-center justify-between">
					<ul className="flex space-x-6 md:mr-6">
						<li>
							<NavLink
								to="/tutor/classrooms"
								end
								className={({ isActive }) =>
									isActive
										? "px-4 py-2 font-medium text-emerald-500 border-b-2 border-b-emerald-500 flex items-center"
										: "px-4 py-2 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-emerald-500 transition flex flex-row items-center"
								}
							>
								<BuildingLibraryIcon className="size-4 mr-1.5" />
								All
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/tutor/classrooms/modules"
								className={({ isActive }) =>
									isActive
										? "px-4 py-2 font-medium text-emerald-500 border-b-2 border-b-emerald-500 flex items-center"
										: "px-4 py-2 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-emerald-500 transition flex flex-row items-center"
								}
							>
								<ArchiveBoxIcon className="size-4 mr-1.5" />
								Modules
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/tutor/classrooms/assignments"
								className={({ isActive }) =>
									isActive
										? "px-4 py-2 font-medium text-emerald-500 border-b-2 border-b-emerald-500 flex items-center"
										: "px-4 py-2 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-emerald-500 transition flex flex-row items-center"
								}
							>
								<ClipboardDocumentCheckIcon className="size-4 mr-1.5" />
								Assignments
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/tutor/classrooms/quizzes"
								className={({ isActive }) =>
									isActive
										? "px-4 py-2 font-medium text-emerald-500 border-b-2 border-b-emerald-500 flex items-center"
										: "px-4 py-2 font-medium text-gray-500 border-b-2 border-b-transparent hover:text-emerald-500 transition flex flex-row items-center"
								}
							>
								<VariableIcon className="size-4 mr-1.5" />
								Quizzes
							</NavLink>
						</li>
					</ul>

					<DropdownMenu>
						<DropdownMenuTrigger className="text-gray-500 flex items-center outline-none">
							Create New <ChevronDownIcon className="size-4 ml-1.5" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Link
									to="/tutor/classrooms/new"
									className="w-full py-2 text-gray-500 hover:text-emerald-500 transition flex flex-row items-center"
								>
									<AcademicCapIcon className="size-4 mr-1.5" />
									Classroom
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									to="/"
									className="w-full py-2 text-gray-500 hover:text-emerald-500 transition flex flex-row items-center"
								>
									<ArchiveBoxIcon className="size-4 mr-1.5" />
									Module
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									to="/"
									className="w-full py-2 text-gray-500 hover:text-emerald-500 transition flex flex-row items-center"
								>
									<ClipboardDocumentCheckIcon className="size-4 mr-1.5" />
									Assignment
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									to="/"
									className="w-full py-2 text-gray-500 hover:text-emerald-500 transition flex flex-row items-center"
								>
									<VariableIcon className="size-4 mr-1.5" />
									Quiz
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	);
}
