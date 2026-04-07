import Header from "@/app/components/Header"
import { TPackage } from "@/app/components/WeddingPackages/types"
import { Metadata } from "next"
import StarIcon from '@/public/images/star.svg'
import PinPointIcon from '@/public/images/pinpoint.svg'
import PopularIcon from '@/public/images/popular.svg'
import CheckListIcon from '@/public/images/checklist.svg'
import Image from "next/image"
import Link from "next/link"
import { ContentTestimonials } from "@/app/components/Testimonials"
import Bonus from "@/app/components/Bonus"
import { Organizer } from "@/app/components/Organizer"
import { getData } from "./actions"


type Request = {
    params: Promise<{ packagesSlug: string }>
}

export async function generateMetadata(
    { params }: Request,
): Promise<Metadata> {
    const slug = (await params).packagesSlug
    const { data: weddingPackage }: { data: TPackage } = await getData(slug)
    return {
        title: weddingPackage.name,
        description: `Get your wedding package ${weddingPackage.name}`,
        icons: {
            icon: "/images/logo-samawa.svg",
        },
    }
}

export default async function DetailsPackagesPage(request: Request) {
    const { packagesSlug } = await request.params
    const { data: weddingPackage }: { data: TPackage } = await getData(packagesSlug)
    const photos = weddingPackage.photos.map((photo) => photo.photo)
    const photoSliced = photos.slice(0, 3)
    return (
        <main className="flex flex-col gap-y-8 relative pb-16 px-5">
            <Header />

            <section className="container mx-auto flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <span className="flex flex-col">
                        <h2 className="text-3xl font-bold">
                            {weddingPackage.name}
                        </h2>
                        <span className="flex gap-x-2 items-center">
                            <PinPointIcon width={22} height={20} />
                            {weddingPackage.city.name}</span>
                    </span>

                    <span className="flex flex-col items-end gap-y-2">
                        <span className="flex gap-x-1 text-color3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <StarIcon key={index} width={22} height={20} />
                            ))}
                        </span>
                        <span className="font-bold">({weddingPackage.weddingTestimonials.length})</span>
                    </span>
                </div>

                <div className="grid grid-cols-4 gap-5 grid-rows-3 h-[550px]">
                    <div className="col-span-3 row-span-3">
                        <span
                            className="flex relative w-full h-full rounded-2xl overflow-hidden"
                        >
                            {weddingPackage.isPopular === 1 && <span className="absolute z-10 top-5 left-5">
                                <span
                                    className="bg-amber-800 text-white rounded-full inline-flex gap-x-2 items-center text-sm py-1 px-3 font-bold uppercase"
                                >
                                    <PopularIcon width={19} height={19} />
                                    Popular
                                </span>
                            </span>}

                            <span className="absolute z-10 bottom-5 left-5">
                                <span
                                    className="bg-amber-800 text-white rounded-full inline-flex gap-x-2 items-center text-sm py-1 px-3 font-bold uppercase"
                                >
                                    <PopularIcon width={19} height={19} />
                                    BROCHURE .PDF
                                </span>
                            </span>

                            <span className="absolute z-10 bottom-5 right-5">
                                <span
                                    className="bg-light1 rounded-full inline-flex gap-x-2 items-center text-sm py-1 px-3 font-bold uppercase"
                                >
                                    <svg
                                        className="text-color2"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.4"
                                            d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44712 2 1.96997 6.47715 1.96997 12C1.96997 17.5228 6.44712 22 11.97 22Z"
                                            className="fill-current"
                                        />
                                        <path
                                            d="M14.9701 10.23L12.0701 8.56C11.3501 8.14 10.4801 8.14 9.76011 8.56C9.04011 8.98 8.61011 9.72 8.61011 10.56V13.91C8.61011 14.74 9.04011 15.49 9.76011 15.91C10.1201 16.12 10.5201 16.22 10.9101 16.22C11.3101 16.22 11.7001 16.12 12.0601 15.91L14.9601 14.24C15.6801 13.82 16.1101 13.08 16.1101 12.24C16.1301 11.4 15.7001 10.65 14.9701 10.23Z"
                                            className="fill-current"
                                        />
                                    </svg>
                                    VIRTUAL 360
                                </span>
                            </span>

                            <Image
                                src={weddingPackage.thumbnail}
                                className="w-full h-full object-cover absolute"
                                fill
                                alt={weddingPackage.name}
                                unoptimized={process.env.NODE_ENV === "development"}
                            />
                        </span>
                    </div>
                    {photoSliced.map((photo, index) => (
                        <div
                            key={index}
                            className="border-2 cursor-pointer border-transparent hover:border-color2 rounded-2xl overflow-hidden">
                            <span className="flex relative w-full h-full">
                                <Image
                                    src={photo}
                                    alt="wedding 2"
                                    className="w-full h-full object-cover absolute"
                                    fill
                                    unoptimized={process.env.NODE_ENV === "development"}
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto">
                <div className="flex gap-x-8">
                    <div className="w-8/12 flex flex-col gap-y-7">
                        <div className="flex flex-col">
                            <h6 className="font-bold text-xl">It's a Good Package</h6>
                            <p className="leading-normal">
                                {weddingPackage.about}
                            </p>
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <h6 className="font-bold text-xl">Bonus Included</h6>
                            {weddingPackage.weddingBonusPackages.length > 0 ?
                                weddingPackage.weddingBonusPackages.map((item) => (
                                    <Bonus key={item.id} bonus={item} packagesSlug={weddingPackage.slug} />
                                )) : <span className="text-center">No Bonus Package</span>}
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <div className="flex justify-between items-center">
                                <h6 className="font-bold text-xl">Wedding Testimonials</h6>
                                <Link
                                    href="#"
                                    className="border border-dark1 px-5 py-3 rounded-full font-semibold"
                                >
                                    View Details
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {weddingPackage.weddingTestimonials.map((testimonial) => (
                                    <ContentTestimonials key={testimonial.id} data={[testimonial]} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-4/12">
                        <div className="sticky top-8">
                            <div className="border p-7 flex flex-col gap-y-5 rounded-2xl">
                                <h6 className="text-3xl text-color2 font-bold">{`Rp ${weddingPackage.price.toLocaleString('id-ID')}`}</h6>
                                <hr />
                                <ul className="flex flex-col gap-y-5 list-none">
                                    {weddingPackage.weddingBonusPackages.map((bonus) => {
                                        return (
                                            <li key={bonus.id} className="flex gap-x-3">
                                                <CheckListIcon className="text-color2" />
                                                <span className="">{bonus.bonusPackage.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <hr />
                                <h6 className="font-bold">Wedding Organizer</h6>
                                <Organizer organizer={weddingPackage.weddingOrganizer} />
                                <hr />
                                <Link
                                    href={`/packages/${weddingPackage.slug}/checkout`}
                                    className="flex justify-center bg-color2 py-4 w-full text-light1 rounded-full">Choose This Package</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}