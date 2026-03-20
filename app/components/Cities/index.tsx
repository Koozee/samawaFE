import { getData } from "@/app/components/Cities/actions";
import { TCity } from "@/app/components/Cities/types";
import Image from "next/image";
import Link from "next/link";

export default async function Cities() {
    const { data }: { data: TCity[] } = await getData();
    return (
        <div className="grid grid-cols-3 gap-7">
            {data.length === 0 && (
                <div className="col-span-3 text-center text-xl font-bold text-red-500">No cities found</div>
            )}
            {data.map((city) => {
                return (
                    <div key={city.id} className="flex border border-transparent hover:border-color2 transition-colors duration-300 bg-light1 p-5 rounded-3xl items-center gap-x-5 relative">
                        <span className="relative w-[80px] aspect-square rounded-3xl overflow-hidden">
                            <Image
                                src={city.icon}
                                alt={city.name}
                                fill
                                unoptimized={process.env.NODE_ENV === "development"}
                                className="w-full h-full object-cover absolute"
                            />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-xl font-bold">{city.name}</span>
                            <span className="">{city.weddingPackages_count} Packages</span>
                        </span>
                        <Link href={`/cities/${city.slug}`} className="absolute inset-0" />
                    </div>
                )
            })}
        </div>
    )
}