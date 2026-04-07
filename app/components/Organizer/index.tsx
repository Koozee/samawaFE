import Image from 'next/image'
import Link from 'next/link'
import { TOrganizer } from '@/app/components/Organizer/types'

export function Organizer({ organizer }: { organizer: TOrganizer }) {
    return (
        <>
            <div
                className="flex border border-light3 hover:border-color2 transition-colors duration-300 bg-light1 p-5 rounded-3xl items-center gap-x-5 relative">
                <span
                    className="relative w-[80px] aspect-square rounded-full overflow-hidden">
                    <Image
                        src={organizer.icon}
                        alt={organizer.name}
                        className="w-full h-full object-cover absolute"
                        fill
                        unoptimized={process.env.NODE_ENV === "development"}
                    />
                </span>
                <span className="flex flex-col">
                    <span className="text-xl font-bold">{organizer.name}</span>
                    <span className="">{organizer.weddingPackages_count} Packages</span>
                </span>
                <Link href={`/organizers/${organizer.slug}`} className="absolute inset-0">
                </Link>
            </div>
        </>
    )
}
