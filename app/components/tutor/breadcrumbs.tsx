import { UIMatch } from "@remix-run/react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function Breadcrumbs({ routes }: { routes: UIMatch[] }) {
	return (
		<Breadcrumb className="my-2.5">
			<BreadcrumbList>
				{routes.map((r, index) => (
					<>
						<BreadcrumbItem key={r.pathname}>
							{r.handle?.breadcrumb()}
						</BreadcrumbItem>
						{routes.at(-1) ? <BreadcrumbSeparator /> : null}
					</>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
