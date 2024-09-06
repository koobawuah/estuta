import { User } from "@/types/user.type";
import { Link, NavLink } from "@remix-run/react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import { cn } from "@/lib/styles";

export type navNode = {
	link: string;
	icon?: React.ReactNode | string;
	route: string;
	subnav?: navNode[];
	roles?: User["role"][] | User["role"];
};

export function NavMenuLinks({
	navNode,
	className,
}: { navNode: navNode; className?: string }) {
	return navNode.subnav && navNode.subnav.length > 0 ? (
		<Accordion type="multiple" key={navNode.route}>
			<AccordionItem value={navNode.route} className="border-b-0">
				<AccordionTrigger
					className={cn(
						"px-2 py-3 rounded-lg hover:bg-purple-100/90 hover:text-purple-900 hover:no-underline transition",
						className,
					)}
				>
					<NavLink
						to={navNode.route}
						end
						className={({ isActive }) =>
							isActive ? "font-medium text-purple-900" : ""
						}
					>
						<span className="flex items-center ">
							{navNode.icon}
							<span className="ml-2.5 md:hidden lg:inline-block">
								{navNode.link}
							</span>
						</span>
					</NavLink>
				</AccordionTrigger>
				<AccordionContent className="pb-0 ml-8">
					{navNode.subnav.map((nav, index) => (
						<NavMenuLinks navNode={nav} key={`${nav.link + index}`} />
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	) : (
		<NavLink
			to={navNode.route}
			key={navNode.route}
			className={({ isActive }) =>
				isActive ? "font-medium text-purple-900" : ""
			}
		>
			<div
				className={cn(
					"flex items-center px-2 py-3 rounded-lg hover:bg-purple-100/90 hover:text-purple-900 hover:no-underline transition",
					className,
				)}
			>
				{navNode.icon}
				<span className="ml-2.5 md:hidden lg:inline-block">{navNode.link}</span>
			</div>
		</NavLink>
	);
}
