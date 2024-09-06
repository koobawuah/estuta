import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardTitle,
	CardHeader,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { users } from "@/models/user.server";
import { getUserId } from "@/session.server";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);
	if (!userId) return redirect("/auth");

	const user = users.find((i) => i.id === userId);

	return json({ user });
};

export default function Payments() {
	return (
		<div className="relative flex flex-col">
			<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
				<CardHeader className="flex flex-row items-center">
					<div className="grid gap-2">
						<CardTitle className="text-lg">Payments</CardTitle>
						<CardDescription>Past payments from your account.</CardDescription>
					</div>
					<Button asChild size="sm" className="ml-auto gap-1 bg-purple-800">
						<Link to="#">
							<BanknotesIcon className="h-4 w-4" />
							Make Payment
						</Link>
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Course</TableHead>
								<TableHead className="hidden xl:table-column">Type</TableHead>
								<TableHead className="hidden xl:table-column">Status</TableHead>
								<TableHead className="hidden xl:table-column">Date</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<div className="font-medium">C++ Programming</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										#43299020209320920
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Sale</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs" variant="outline">
										Approved
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-23
								</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">
										Introduction to Visual Basics
									</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										#65244030249321921
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Refund</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs" variant="outline">
										Declined
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-24
								</TableCell>
								<TableCell className="text-right">$150.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">
										Web Development and Web Technologies
									</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										#23299110211120912
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">
									Subscription
								</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs" variant="outline">
										Approved
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-25
								</TableCell>
								<TableCell className="text-right">$350.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">
										Algorithms & Data Structures
									</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										#53299111119323333
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Sale</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs" variant="outline">
										Approved
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-26
								</TableCell>
								<TableCell className="text-right">$450.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">
										Introduction Artificial Intelligence
									</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										#78899444444328928
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Sale</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs" variant="outline">
										Approved
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-27
								</TableCell>
								<TableCell className="text-right">$550.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
