import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	return json({ status: "ok" });
}

export default function TutorEarnings() {
	return (
		<div className="max-w-6xl mx-auto w-full p-4 space-y-5">
			<Card className="md:col-span-2">
				<CardHeader className="flex flex-row items-center">
					<div className="grid gap-2">
						<CardTitle className="">Earnings</CardTitle>
						<CardDescription>Amount you are making on estuta.</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Student</TableHead>
								<TableHead className="hidden md:table-column">Type</TableHead>
								<TableHead className="hidden md:table-column">Status</TableHead>
								<TableHead className="hidden md:table-column">Date</TableHead>
								<TableHead className="text-right">Classroom</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<div className="font-medium">Liam Johnson</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell className="hidden md:table-column">Sale</TableCell>
								<TableCell className="hidden md:table-column">
									<Badge className="text-xs" variant="outline">
										Approved
									</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-23
								</TableCell>
								<TableCell className="text-right">Nursing</TableCell>
								<TableCell className="text-right">GHS2,500.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Olivia Smith</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										olivia@example.com
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
								<TableCell className="text-right">Public Health</TableCell>
								<TableCell className="text-right">GHS1,500.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Noah Williams</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										noah@example.com
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
								<TableCell className="text-right">Nursing</TableCell>
								<TableCell className="text-right">GHS2,500.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Emma Brown</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										emma@example.com
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
								<TableCell className="text-right">Nursing</TableCell>
								<TableCell className="text-right">GHS2,500.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Liam Johnson</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										liam@example.com
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
								<TableCell className="text-right">Nursing</TableCell>
								<TableCell className="text-right">GHS2,500.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
