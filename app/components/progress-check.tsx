import { cn } from "@/lib/styles";

export function ProgressCheck({
	progress,
	progressColor,
	className,
	styleProgressBar,
}: {
	progress: number;
	progressColor: string;
	className?: string;
	styleProgressBar?: React.CSSProperties;
}) {
	return (
		<div className={cn("w-full flex flex-col gap-3", className)}>
			<p className="text-xs font-medium shrink-0">{progress}% progress</p>
			<div className="w-full overflow-hidden rounded-full bg-gray-200">
				<div
					className="h-2 w-2/3 rounded-full transition-all"
					style={{
						backgroundColor: progressColor,
						width: `${progress}%`,
						...styleProgressBar,
					}}
				/>
			</div>
		</div>
	);
}
