import Header from "@/app/components/Header";
import { InputForm } from "@/app/components/InputForm";
import ArrowIcon from '@/public/images/arrow.svg'
import PersonIcon from '@/public/images/person.svg'
import MailIcon from '@/public/images/mail.svg'
import PhoneIcon from '@/public/images/phone.svg'
import CalendarIcon from '@/public/images/calendar.svg'
import ProtectIcon from '@/public/images/protect.svg'
import ReceiptIcon from '@/public/images/receipt.svg'
import CommentsIcon from '@/public/images/comments.svg'
import ServerShieldIcon from '@/public/images/server-shield.svg'
import Link from "next/link";
import { Metadata } from "next";
import { TPackage } from "@/app/components/WeddingPackages/types";
import { getData as getBookingData } from "./actions";
import { TBooking } from "./types";
import Image from "next/image";
import Bonus from "@/app/components/Bonus";
import { getData as getWeddingPackages } from "@/app/packages/[packagesSlug]/actions";

type Request = {
    params: Promise<{ bookingTrxId: string }>
    searchParams: Promise<{ phone: string }>
}

export async function generateMetadata(
    { params, searchParams }: Request,
): Promise<Metadata> {
    const bookingTrxId = (await params).bookingTrxId
    const phone = (await searchParams).phone
    const { data: booking }: { data: TBooking } = await getBookingData(bookingTrxId, phone)
    return {
        title: booking.wedding_package.name,
        description: `Get your wedding package ${booking.wedding_package.name}`,
        icons: {
            icon: "/images/logo-samawa.svg",
        },
    }
}

export default async function BookingDetailPage({ params, searchParams }: Request) {
    const bookingTrxId = (await params).bookingTrxId
    const phone = (await searchParams).phone
    const { data: booking }: { data: TBooking } = await getBookingData(bookingTrxId, phone)
    const { data: weddingPackages }: { data: TPackage } = await getWeddingPackages(booking.wedding_package.slug)

    return (
        <main className="flex flex-col gap-y-8 relative bg-light2">
            <Header />

            <section className="container mx-auto flex flex-col gap-y-4">
                <h2 className="text-3xl font-bold">Booking #{bookingTrxId}</h2>

                <div className="flex gap-x-12">
                    <div className="w-8/12">
                        <div className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-5 bg-white rounded-2xl p-7">
                                <input
                                    type="checkbox"
                                    name="accordion"
                                    id="customer-information"
                                    className="peer hidden"
                                    defaultChecked
                                /><label
                                    htmlFor="customer-information"
                                    className="flex justify-between [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                                >
                                    <h6 className="text-xl font-bold">Customer Information</h6>
                                    <span
                                        className="text-color2 flex items-center justify-center transition-all duration-300 rotate-(--state-rotate)"
                                    >
                                        <ArrowIcon width={24} height={24} />
                                    </span>
                                </label>
                                <div
                                    className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:max-h-screen"
                                >
                                    <hr />
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputForm readOnly value={booking.name} name="Name" id="name" placeholder="Write your complete name" icon={<PersonIcon width={24} height={24} />} />

                                        <InputForm readOnly value={booking.email} name="Email" id="email" placeholder="Write your complete email" icon={<MailIcon width={24} height={24} />} />

                                        <InputForm readOnly value={booking.phone} name="Phone" id="phone" placeholder="Let us know your number" icon={<PhoneIcon width={24} height={24} />} />

                                        <InputForm readOnly value={new Date(booking.started_at).toISOString().split('T')[0]} name="Started At" id="started_at" placeholder="Write your complete date" icon={<CalendarIcon width={24} height={24} />} type="date" />
                                    </div>

                                    <hr />

                                    <span className="flex items-center gap-x-2 text-color4">

                                        <ProtectIcon width={24} height={24} />
                                        <span>Samawa is protecting your privacy better</span>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-5 bg-white rounded-2xl p-7">
                                <input
                                    type="checkbox"
                                    name="accordion"
                                    id="wedding-bonus"
                                    className="peer hidden"
                                    defaultChecked
                                />
                                <label
                                    htmlFor="wedding-bonus"
                                    className="flex justify-between [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                                >
                                    <h6 className="text-xl font-bold">Wedding Bonus Package</h6>
                                    <span
                                        className="text-color2 flex items-center justify-center transition-all duration-300 rotate-(--state-rotate)"
                                    >
                                        <ArrowIcon width={24} height={24} />
                                    </span>
                                </label>

                                <div className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
                                    <hr />
                                    {weddingPackages.weddingBonusPackages.map((bonus) => {
                                        return (
                                            <Bonus
                                                key={bonus.id}
                                                bonus={bonus}
                                                packagesSlug={weddingPackages.slug}
                                            />
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-5 bg-white rounded-2xl p-7">
                                <input
                                    type="checkbox"
                                    name="accordion"
                                    id="payment-details"
                                    className="peer hidden"
                                    defaultChecked
                                />
                                <label
                                    htmlFor="payment-details"
                                    className="flex justify-between [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                                >
                                    <h6 className="text-xl font-bold">Payment Details</h6>
                                    <span
                                        className="text-color2 flex items-center justify-center transition-all duration-300 rotate-(--state-rotate)"
                                    >
                                        <ArrowIcon width={24} height={24} />
                                    </span>
                                </label>
                                <div
                                    className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen"
                                >
                                    <hr />
                                    <div className="flex items-center gap-x-3">
                                        <span className="text-color2">
                                            <ReceiptIcon width={24} height={24} />
                                        </span>
                                        <span className="">Status Transaction</span>
                                        <span
                                            className={`font-semibold text-light1 ml-auto rounded-full py-1 px-3 uppercase ${booking.is_paid ? "bg-color4" : "bg-color1"}`}
                                        >{booking.is_paid ? "Success" : "Pending"}</span
                                        >
                                    </div>

                                    <div className="flex items-center gap-x-3">
                                        <span className="text-color2">
                                            <ReceiptIcon width={24} height={24} />
                                        </span>
                                        <span className="">Package Quantity</span>
                                        <span className="font-bold ml-auto">1 Wedding Package</span>
                                    </div>

                                    <div className="flex items-center gap-x-3">
                                        <span className="text-color2">
                                            <CommentsIcon width={24} height={24} />
                                        </span>
                                        <span className="">Consultation & Insurance</span>
                                        <span className="font-bold ml-auto">Rp 0 (Free)</span>
                                    </div>

                                    <div className="flex items-center gap-x-3">
                                        <span className="text-color2">
                                            <ServerShieldIcon width={24} height={24} />
                                        </span>
                                        <span className="">Grand Total Amount</span>
                                        <span className="font-bold text-xl text-color2 ml-auto"
                                        >Rp {booking.total_amount.toLocaleString('id-ID')}</span
                                        >
                                    </div>
                                    <hr />

                                    <h6 className="text-xl font-bold">Proof of Payment</h6>

                                    <span
                                        className="relative w-[390px] aspect-video rounded-2xl overflow-hidden"
                                    >
                                        <Image
                                            src={booking.proof}
                                            alt="wedding 2"
                                            className="w-full h-full object-cover absolute"
                                            fill
                                            unoptimized={process.env.NODE_ENV === 'development'}
                                        />
                                    </span>

                                    <Link
                                        href={`https://wa.me/${booking.wedding_package.weddingOrganizer.phone}`}
                                        target="_blank"
                                        className="bg-color2 text-light1 font-semibold gap-x-2 flex items-center justify-center py-3 rounded-full w-full">
                                        <span>Contact Customer Service</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-4/12">
                        <div className="sticky top-8">
                            <div className="bg-light1 p-7 flex flex-col gap-y-5 rounded-2xl">
                                <h6 className="text-2xl font-bold">
                                    {booking.wedding_package.name}
                                </h6>
                                <span
                                    className="relative w-full aspect-video rounded-2xl overflow-hidden"
                                >
                                    <Image
                                        src={booking.wedding_package.thumbnail}
                                        alt="wedding 2"
                                        className="w-full h-full object-cover absolute"
                                        fill
                                        unoptimized={process.env.NODE_ENV === 'development'}
                                    />
                                </span>

                                <h6 className="font-bold">Wedding Organizer</h6>
                                <div
                                    className="flex border border-light3 hover:border-color2 transition-colors duration-300 bg-light1 p-5 rounded-3xl items-center gap-x-5 relative"
                                >
                                    <span
                                        className="relative w-[80px] aspect-square rounded-full overflow-hidden"
                                    >
                                        <Image
                                            src={booking.wedding_package.weddingOrganizer.icon}
                                            alt={booking.wedding_package.weddingOrganizer.name}
                                            className="w-full h-full object-cover absolute"
                                            fill
                                            unoptimized={process.env.NODE_ENV === 'development'}
                                        />
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="text-xl font-bold">{booking.wedding_package.weddingOrganizer.name}</span>
                                        <span className="">{booking.wedding_package.weddingOrganizer.weddingPackages_count} Packages</span>
                                    </span>
                                    <Link href={`/organizers/${booking.wedding_package.weddingOrganizer.slug}`} className="absolute inset-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
