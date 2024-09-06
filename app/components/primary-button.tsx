import { cn } from "@/lib/styles";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function PrimaryBtn({ 
        title, 
        icon,
        children, 
        className, 
        isLoading, 
        ...props
    }: { 
        title?: string, 
        icon?: React.ReactNode | React.ReactElement,
        children?: React.ReactNode, 
        className?: string, 
        isLoading?: boolean, 
    } & React.ButtonHTMLAttributes<HTMLButtonElement>) {

    return (
        <button className={cn("p-2 group gap-1.5 relative flex justify-center items-center", className)} {...props}>
            {icon && <span className={isLoading ? 'invisible' : ''}>{icon }</span> }
            {isLoading && (<span className="absolute inset-0 flex justify-center items-center"><ArrowPathIcon className='size-5 animate-spin'/></span>)}
            <div className={isLoading ? 'invisible' : ''}>
                {title && (<p>{title}</p>)}
                {children}
            </div>
        </button>
    )
}