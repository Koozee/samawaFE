"use client"
import Image from "next/image";
import { TBonusPackage } from "./types";
import useQueryParams from "@/lib/useQueryParams";
import Link from "next/link";

export default function Bonus({ bonus, packagesSlug }: { bonus: TBonusPackage, packagesSlug: string }) {
    const queryParams = useQueryParams();

    return (
        <>
            <div className="flex border p-5 gap-x-5 rounded-2xl items-center">
                <span
                    className="flex w-44 aspect-video relative rounded-2xl overflow-hidden"
                >
                    <Image
                        src={bonus.bonusPackage.thumbnail}
                        alt={bonus.bonusPackage.name}
                        className="w-full h-full object-cover absolute"
                        fill
                        unoptimized={process.env.NODE_ENV === "development"} />
                </span>
                <div className="flex flex-col">
                    <h6 className="text-xl font-bold">
                        {bonus.bonusPackage.name}
                    </h6>
                    <span className="flex gap-x-2">
                        <span className="text-color2">
                            <span className="font-semibold"> Rp 0 </span>
                            <span className=""> /package </span>
                        </span>
                        <span className="line-through">Rp {bonus.bonusPackage.price.toLocaleString('id-ID')}</span>
                    </span>
                </div>
                <Link
                    href={{
                        query: {
                            ...queryParams,
                            modal: "bonus",
                            bonusId: bonus.bonusPackage.id,
                            packagesSlug: packagesSlug || bonus.bonusPackage.slug
                        }
                    }}
                    className="border ml-auto border-dark1 px-5 py-3 rounded-full font-semibold cursor-pointer"
                >
                    View Details
                </Link>
            </div>

        </>
    );
}
