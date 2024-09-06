import { IdCardIcon, LaptopIcon, MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import * as React from "react";
import { useHydrated } from "remix-utils/use-hydrated";

import {
	getTheme,
	setTheme as setSystemTheme,
} from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
	const hydrated = useHydrated();
	const [, rerender] = React.useState({});
	const setTheme = React.useCallback((theme: string) => {
		setSystemTheme(theme);
		rerender({});
	}, []);
	const theme = getTheme();

	return (
		<header className="flex items-center justify-between px-4 py-2 md:py-4">
			<div className="flex items-center space-x-4">
				<Link className="flex items-center space-x-2" to="/">
					{/* <HomeIcon className="h-6 w-6" /> */}
					<span className="text-lg font-bold">estuta</span>
				</Link>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className="w-10 h-10 rounded-full border"
						size="icon"
						variant="ghost"
					>
						<span className="sr-only">User selector</span>
						 {theme === "light" ? (
							<IdCardIcon />
						) : (
							<PersonIcon />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mt-2">
					<DropdownMenuLabel>User</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<button
							type="button"
							className="w-full"
							onClick={() => console.log()}
						>
							Tutor
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button
							type="button"
							className="w-full"
							onClick={() => console.log()}
						>
							Student
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
