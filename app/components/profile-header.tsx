import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ProfileHeader({
	children,
	profileHeading,
	profileSubheading,
}: {
	children?: React.ReactNode;
	profileHeading?: string;
	profileSubheading?: string;
}) {
	return (
		<div className="w-full h-60 relative rounded-xl">
			<div className="w-full h-full overflow-hidden rounded-xl">
				<img
					src="/assets/images/bg.jpg"
					className="w-full h-full object-cover"
					alt="Profile Banner"
				/>
			</div>
			<div className="w-11/12 max-w-7xl px-6 pt-6 absolute inset-x-0 -bottom-24 md:-bottom-20 mx-auto bg-white flex flex-col rounded-xl shadow-lg">
				<div className="flex flex-col items-center md:flex-row md:items-center space-x-3">
					<Avatar className="w-24 h-24">
						<AvatarImage className="" alt="Profile image" />
						<AvatarFallback>KK</AvatarFallback>
					</Avatar>
					<div className="w-full flex flex-col items-center md:items-start space-y-2.5">
						<h2 className="text-2xl text-gray-700 font-semibold">
							{profileHeading ?? "Kwame Ampofo"}
						</h2>
						<p className="text-sm text-gray-400">
							{profileSubheading ?? "Something important"}
						</p>
					</div>
				</div>
				<div className="w-full my-3 flex justify-center items-end md:justify-end">
					{children}
				</div>
			</div>
		</div>
	);
}
