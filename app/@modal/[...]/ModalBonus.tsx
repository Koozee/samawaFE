import Image from "next/image";
import { TPackage } from "@/app/components/WeddingPackages/types";
import { CloseModalButton } from "@/app/components/Modal";

type props = {
    bonusId: string,
    packagesSlug: string
}

async function getData(packagesSlug: string) {
    try {
        let url = `${process.env.NEXT_API_URI}/wedding-package/${packagesSlug}`
        const res = await fetch(url, { method: "GET", cache: "no-cache" })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json();
    } catch (error) {
        console.error(error)
        return { data: null }
    }
}

export async function ModalBonus({ bonusId, packagesSlug }: props) {
    const { data: details }: { data: TPackage } = await getData(packagesSlug)
    console.log(packagesSlug)
    const bonus = details?.weddingBonusPackages?.find((bonusPackage) => bonusPackage.bonusPackage.id === Number(bonusId))

    if (!bonus) {
        return null;
    }

    return (
        <>
            <span className="relative w-full h-full aspect-video rounded-2xl overflow-hidden">
                <Image
                    src={bonus.bonusPackage.thumbnail}
                    alt={bonus.bonusPackage.name}
                    className="w-full h-full object-cover absolute"
                    fill
                    unoptimized={process.env.NODE_ENV === "development"} />
            </span>
            <hr />
            <div className="flex flex-col">
                <h6 className="text-xl font-bold">{bonus.bonusPackage.name}</h6>
                <span className="flex gap-x-2">
                    <span className="text-color2">
                        <span className="font-semibold"> Rp 0 </span>
                        <span className=""> /package </span>
                    </span>
                    <span className="line-through">Rp {bonus.bonusPackage.price.toLocaleString('id-ID')}</span>
                </span>
            </div>

            <hr />
            <div className="flex flex-col">
                <h6 className="font-bold text-xl">About</h6>
                <p className="leading-normal whitespace-pre-wrap">
                    {bonus.bonusPackage.about}
                </p>
            </div>
            <hr />
            <span className="flex">
                <CloseModalButton />
            </span>
        </>
    );
}