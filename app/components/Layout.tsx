import * as siteConfig from "@/site.json";
import { useState, useEffect, ReactNode } from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import {
// 	NavigationMenu,
// 	NavigationMenuItem,
// 	NavigationMenuList,
// } from "./ui/navigation-menu";
import { Form, Link, NavLink } from "@remix-run/react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Badge } from "./ui/badge";
import { User } from "@/types/user.type";
import {
	AcademicCapIcon,
	ArrowRightStartOnRectangleIcon,
	BookOpenIcon,
	BuildingLibraryIcon,
	CalendarDaysIcon,
	CogIcon,
	CreditCardIcon,
	HomeIcon,
	LifebuoyIcon,
	MagnifyingGlassIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { title } from "@/config.shared";
import { NavMenuLinks, navNode } from "./nav-menu-links";

type NavMenu = {
	path: string;
	name: string;
};
type Node = {
	children: React.ReactNode;
	currentLoggedInUserImage?: string;
	currUser?: User;
	currentLoggedInUser?: string;
	currentLoggedInUserAuth?: { permissions: Permissions };
	notifications?: { generalNotifications?: number; newWithdrawals?: number };
};

const profileMenu: NavMenu[] = [
	// { path: "/profile", name: "Profile" },
	// { path: `mailto:${siteConfig.supportMail}`, name: "Help" },
];
const nav: navNode[] = [
	{
		link: "Home",
		route: "/student",
		icon: <HomeIcon className="size-5" />,
	},
	{
		link: "Find a Course",
		route: "/courses",
		icon: <AcademicCapIcon className="size-5" />,
	},
	{
		link: "My Courses",
		route: "/my-courses",
		icon: <BookOpenIcon className="size-5" />,
	},
	{
		link: "Schedule",
		route: "/schedule",
		icon: <CalendarDaysIcon className="size-5" />,
	},
	{
		link: "My Profile",
		route: "/profile",
		icon: <UserIcon className="size-5" />,
		subnav: [
			{
				link: "Account",
				route: "/profile/account",
				icon: <BuildingLibraryIcon className="size-5" />,
			},
			{
				link: "Payments",
				route: "/profile/payments",
				icon: <CreditCardIcon className="size-5" />,
			},
		],
	},
];

export default function Layout({
	children,
	currUser,
	currentLoggedInUserImage,
	currentLoggedInUser,
	currentLoggedInUserAuth,
	notifications,
}: Node) {
	const [open, setOpen] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<div className="bg-white md:flex md:h-screen">
			<div className="hidden md:w-24 md:h-screen lg:w-72 md:bg-white md:flex md:flex-col">
				<header className="h-20 p-4 mx-5 flex justify-center items-center lg:justify-start">
					<Link
						to="/student"
						prefetch="intent"
						className="font-black text-2xl text-slate-950 lg:hidden"
					>
						{title()}
					</Link>
					<Link
						to="/student"
						prefetch="intent"
						className="font-black text-lg text-slate-950 md:hidden lg:block"
					>
						{title()}
					</Link>
				</header>
				<nav className="flex-1 px-6 space-y-2.5">
					<h3 className="ml-2.5 font-bold uppercase text-xs">Learn</h3>
					<div>
						{nav.map((nav, idx) => (
							<NavMenuLinks navNode={nav} key={`${nav.route + idx}`} />
						))}
					</div>
				</nav>

				<footer className="px-4 py-4 space-y-3">
					<hr className="border border-gray-100" />
					<Link
						to={`mailto:${siteConfig.supportMail}`}
						className={
							"w-full px-5 py-3 flex items-center text-base font-medium text-gray-400 hover:text-gray-800 transition rounded-md md:justify-center lg:justify-start"
						}
					>
						<LifebuoyIcon className="w-5 h-5" />
						<span className="ml-2.5 md:hidden lg:inline-block">Get help</span>
					</Link>
				</footer>
			</div>

			<div className="md:my-3 md:mr-3 bg-gray-50 md:flex md:flex-1 md:flex-col md:overflow-y-scroll relative md:border-l md:border-l-gray-200 rounded-r-2xl">
				<header className="w-full h-20 flex justify-between items-center bg-white border-b border-gray-100 md:bg-transparent md:border-b-0 py-4 pl-4 pr-6 sticky top-0 z-10">
					{/* Mobile sidebar menu */}
					<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
						<SheetTrigger className="md:hidden">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.8}
								stroke="currentColor"
								className="w-5 h-5 text-gray-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 9h16.5m-16.5 6.75h16.5"
								/>
							</svg>
						</SheetTrigger>
						<SheetContent
							className="w-[100vw] flex flex-col md:hidden"
							side="left"
						>
							<SheetHeader>
								<div className="w-full flex justify-between">
									<span className="mx-2.5">
										<Link
											prefetch="intent"
											to="/student"
											className="font-black text-lg text-slate-950"
										>
											{title()}
										</Link>
									</span>
								</div>
							</SheetHeader>
							<div className="my-6 flex-1">
								<nav className=" space-y-2.5">
									<h3 className="ml-2.5 font-bold uppercase text-xs">Learn</h3>
									<div>
										{nav.map((nav, idx) => (
											<NavMenuLinks navNode={nav} key={`${nav.route + idx}`} />
										))}
									</div>
								</nav>
							</div>
							<footer className="py-4 space-y-3">
								<hr className="border border-gray-100" />
								<Link
									to={`mailto:${siteConfig.supportMail}`}
									className={
										"w-full px-5 py-3 flex items-center text-base font-medium text-gray-400 hover:text-gray-800 transition rounded-md md:justify-center lg:justify-start"
									}
								>
									<LifebuoyIcon className="w-5 h-5" />
									<span className="ml-4 md:hidden lg:inline-block">
										Get help
									</span>
								</Link>
							</footer>
						</SheetContent>
					</Sheet>
					{/* Mobile sidebar menu End */}

					<div className="w-full flex items-center">
						<div className="flex flex-1">
							<div
								onClick={() => setOpen((open) => !open)}
								onKeyDown={() => console.log("Search pressed")}
								className="hidden md:w-72 md:bg-white md:flex md:flex-row md:items-center md:space-x-2 md:py-2 md:px-2 md:rounded-full md:hover:bg-gray-100 md:hover:transition md:border md:border-gray-200 md:cursor-pointer md:shadow-sm"
							>
								<MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
								<span className="hidden md:inline-block text-gray-500 md:text-sm">
									Search here...
								</span>
							</div>
						</div>

						<div className="m-4">
							<CommandDialog open={open} onOpenChange={setOpen}>
								<CommandInput
									className="w-48 truncate md:w-full"
									placeholder="Type an action or find something here..."
								/>
								<CommandList className="">
									<CommandEmpty>Sorry, no results found.</CommandEmpty>
									<CommandGroup heading="Suggestions">
										<Link to="/dashboard">
											<CommandItem className="text-sm font-light">
												Reports
											</CommandItem>
										</Link>
										<Link to="/customers">
											<CommandItem className="text-sm font-light">
												View customers
											</CommandItem>
										</Link>
										<Link to="/transactions">
											<CommandItem className="text-sm font-light">
												All transactions
											</CommandItem>
										</Link>
									</CommandGroup>
									<CommandGroup heading="Quick actions">
										<CommandItem>Account</CommandItem>
									</CommandGroup>
									<CommandGroup>
										<Link to={`mailto:${siteConfig.supportMail}`}>
											<CommandItem>
												<LifebuoyIcon className="w-4 h-4 mr-3 stroke-1" />
												Help
											</CommandItem>
										</Link>
										<Link to="/settings">
											<CommandItem>
												<CogIcon className="w-4 h-4 mr-3 stroke-1" />
												Settings page
											</CommandItem>
										</Link>
									</CommandGroup>
								</CommandList>
							</CommandDialog>
						</div>

						<Button
							onClick={() => setOpen((open) => !open)}
							variant="ghost"
							className="px-1 hover:bg-transparent md:hidden"
						>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.8}
								stroke="currentColor"
								className="w-4 h-4 text-gray-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</Button>

						<div className="ml-6 md:flex md:items-center md:space-x-6">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarImage
											src={currentLoggedInUserImage ?? ""}
											className="object-cover"
										/>
										<AvatarFallback>
											{currentLoggedInUser ?? "U"}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="" align="end">
									<ul>
										{profileMenu?.map((link, index) => (
											<Link
												prefetch="intent"
												key={`${link.name + index}`}
												to={link?.path}
											>
												<DropdownMenuItem className="">
													{link?.name}
												</DropdownMenuItem>
											</Link>
										))}
									</ul>
									<DropdownMenuSeparator />
									<Form action="/logout" method="post">
										<DropdownMenuItem>
											<button type="submit" className="w-full text-left">
												Log out
											</button>
										</DropdownMenuItem>
									</Form>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</header>

				<div className="w-full h-full px-3 md:py-6 md:px-10 relative">
					{children}
				</div>
			</div>
		</div>
	);
}
