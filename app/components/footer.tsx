import { cn } from '@/lib/styles'
import * as siteMeta from '@/site.json'

export default function Footer({ className, children }: { children?: React.ReactNode; className?: string; }) {

    return (
        <div className={cn("w-full py-2 flex flex-col space-y-2", className)}>
            {children}
            <p className='mx-auto text-sm text-slate-400 font-normal'> &copy; {siteMeta.name} {new Date().getFullYear()}</p>
        </div>
    )
}

