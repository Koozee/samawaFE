import { ModalBonus } from "@/app/@modal/[...]/ModalBonus";
import { PreventScrolling, RouterBack } from "@/app/components/Modal"

type Request = {
    searchParams: Promise<{
        modal?: string,
        [key: string]: string | undefined
    }>
}

export default async function ModalPage(request: Request) {
    const searchParams = await request.searchParams;
    if (searchParams.modal && searchParams.modal !== "") {
        return (
            <>
                <div className="fixed bg-black/80 z-50 inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-5 flex flex-col gap-y-5 w-6/12 h-5/6">
                        {/* catch search params disini untuk render modal */}
                        {searchParams.modal === "bonus" && (
                            <ModalBonus
                                bonusId={searchParams.bonusId || ""}
                                packagesSlug={searchParams.packagesSlug || ""}
                            />
                        )}
                    </div>
                    <RouterBack />
                </div>
                <PreventScrolling />
            </>
        )
    }
    return null
}