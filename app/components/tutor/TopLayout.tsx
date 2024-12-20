import { title } from "@/config.shared";
import { Link } from "@remix-run/react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
	Bars4Icon,
	MagnifyingGlassIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Input } from "../ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavMenuLinks, navNode } from "../nav-menu-links";
import { useState } from "react";

const nav: navNode[] = [
	{
		link: "Overview",
		route: "/tutor",
		// icon: <HomeIcon className="size-5" />,
	},
	// {
	// 	link: "Courses",
	// 	route: "/tutor/courses",
	// 	// icon: <AcademicCapIcon className="size-5" />,
	// },
	{
		link: "Classrooms",
		route: "/tutor/classrooms",
		// icon: <BookOpenIcon className="size-5" />,
	},
	{
		link: "Account",
		route: "/tutor/account",
		// icon: <UserIcon className="size-5" />,
	},
	{
		link: "Settings",
		route: "/tutor/settings",
		// icon: <CreditCardIcon className="size-5" />,
	},
];

export function TopLayout({ children }: { children?: React.ReactNode }) {
	const [sheetOpen, setSheetOpen] = useState(false);

	return (
		<>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<Link
						to="/tutor"
						className="flex items-center gap-2 text-lg font-semibold md:text-base"
					>
						<span className="font-black text-lg text-slate-950">{title()}</span>
					</Link>
					{nav.map((nav) => (
						<Link
							key={nav.route}
							to={nav.route}
							className="text-foreground transition-colors hover:text-foreground"
						>
							{nav.link}
						</Link>
					))}
				</nav>
				<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Bars4Icon className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								to="/tutor"
								className="flex items-center gap-2 text-lg font-semibold"
							>
								<span className="font-black text-lg text-slate-950">
									{title()}
								</span>
							</Link>
							{nav.map((nav, idx) => (
								<Link
									key={nav.route}
									to={nav.route}
									className="text-muted-foreground hover:text-foreground"
									onClick={() => setSheetOpen(false)}
								>
									{nav.link}
								</Link>
								// <NavMenuLinks navNode={nav} key={`${nav.route + idx}`} />
							))}
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<MagnifyingGlassIcon className="size-4 absolute left-2.5 top-2.5  text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search actions..."
								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<UserCircleIcon className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				{children}
			</main>
		</>
	);
}
