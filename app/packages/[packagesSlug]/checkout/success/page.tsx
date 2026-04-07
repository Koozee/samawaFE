import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import ReservationDateIcon from "@/public/images/reservation-date.svg";
import { TPackage } from "@/app/components/WeddingPackages/types";
import { getData } from "@/app/packages/[packagesSlug]/actions";
import { Metadata } from "next";

type Request = {
    searchParams: Promise<{ bookingId: string }>
    params: Promise<{ packagesSlug: string }>
}

export async function generateMetadata(
    { searchParams, params }: Request,
): Promise<Metadata> {
    const bookingId = (await searchParams).bookingId
    const slug = (await params).packagesSlug
    const { data: weddingPackage }: { data: TPackage } = await getData(slug)
    return {
        title: `Booking ${bookingId}`,
        description: `Booking ${bookingId}`,
        icons: {
            icon: "/images/logo-samawa.svg",
        },
    }
}

export default async function SuccessPage({ searchParams, params }: Request) {
    const bookingId = (await searchParams).bookingId;
    const { packagesSlug } = await params
    const { data: weddingPackage }: { data: TPackage } = await getData(packagesSlug)
    return (
        <main className="flex flex-col gap-y-8 relative bg-light2 min-h-screen">
            <Header />
            <section className="max-w-xl mx-auto flex flex-col rounded-[40px] p-10 gap-y-5 bg-light1 w-full">
                <h1 className="text-3xl font-bold text-center">Booking Finished!</h1>
                <span className="relative w-full h-[120px] rounded-3xl overflow-hidden">
                    <Image
                        src={weddingPackage.thumbnail}
                        alt={weddingPackage.name}
                        className="w-full h-full object-cover absolute"
                        fill
                        unoptimized={process.env.NODE_ENV === 'development'}
                    />
                </span>

                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="booking_trx_id">Booking ID</label>
                    <div className="flex relative">
                        <span
                            className="absolute left-0 bottom-0 top-0 aspect-square flex items-center justify-center text-color2"
                        >
                            <ReservationDateIcon width={24} height={24} />
                        </span>
                        <input
                            type="text"
                            className="pl-10 select-none cursor-default w-full py-3 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-full font-bold"
                            name="booking_trx_id"
                            id="booking_trx_id"
                            readOnly
                            value={bookingId}
                            placeholder="Booking ID"
                        />
                    </div>
                </div>

                <p className="">
                    Gunakan kode booking di atas untuk memeriksa status pemesananmu
                </p>

                <div className="flex flex-col gap-y-4">
                    <Link
                        href="/"
                        className="bg-color2 text-light1 font-semibold gap-x-2 flex items-center justify-center py-3 rounded-full w-full">
                        <span>Booking Other Package</span>
                    </Link>
                    <Link
                        href="/bookings"
                        className="border border-dark1 gap-x-2 flex items-center font-semibold justify-center py-3 rounded-full w-full">
                        <span>View My Booking</span>
                    </Link>
                </div>
            </section>
        </main>
    )
}