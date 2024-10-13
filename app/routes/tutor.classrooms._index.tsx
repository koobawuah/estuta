import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	EllipsisVerticalIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function Index() {
	return (
		<div className="">
			<Table className="border-separate border-spacing-y-4">
				<TableCaption>A list of your created classrooms.</TableCaption>
				<TableHeader className="">
					<TableRow>
						<TableHead>Classroom Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Session</TableHead>
						<TableHead>Student Count</TableHead>
						<TableHead>Pending Reviews</TableHead>
						<TableHead>Date Created</TableHead>
						<TableHead className="text-right">Earnings</TableHead>
						<TableHead>&nbsp;</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="">
					<TableRow className="h-20 bg-gray-50">
						<TableCell>Nursing college</TableCell>
						<TableCell>Something come and something goes</TableCell>
						<TableCell>Morning</TableCell>
						<TableCell className="text-center">3</TableCell>
						<TableCell className="text-center">5</TableCell>
						<TableCell>{new Date("9-10-2024").toLocaleDateString()}</TableCell>
						<TableCell className="text-right">GHS250.00</TableCell>
						<TableCell className="text-right">
							<DropdownMenu>
								<DropdownMenuTrigger className="p-4">
									<EllipsisVerticalIcon className="size-6" />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<PencilSquareIcon className="size-4 mr-2.5" />
										Edit
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<TrashIcon className="size-4 mr-2.5" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
