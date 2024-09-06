import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

export function SearchHeader({
	heading,
	onChange,
	btnOnClick,
}: { heading: string; onChange?: () => void; btnOnClick?: () => void }) {
	return (
		<>
			<div className="w-full h-60 relative rounded-xl">
				<div className="w-full h-full overflow-hidden rounded-xl">
					<img
						src="/assets/images/bg2.jpg"
						className="w-full h-full object-cover object-top"
						alt="Profile Banner"
					/>
					<h1 className="max-w-[400px] text-gray-50 text-2xl drop-shadow-md  text-balance font-semibold isolate absolute top-20 left-10 md:text-3xl md:mx-20">
						{heading}
					</h1>
				</div>
				<div className="w-11/12 h-20 max-w-7xl px-6 absolute inset-x-0 -bottom-10 md:-bottom-10 mx-auto bg-white flex flex-col justify-center rounded-full shadow-lg">
					<form method="GET">
						<div className="flex justify-between items-center md:flex-row md:items-center space-x-3">
							<input
								className="w-full h-full text-2xl self-start p-2.5 font-light bg-transparent border-0 focus:border-0 focus:outline-0"
								placeholder="Search for a course..."
								type="text"
								onChange={onChange}
							/>

							<Button
								onClick={btnOnClick}
								className="p-2.5 rounded-full"
								variant="ghost"
							>
								<MagnifyingGlassIcon className="size-6" />
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
