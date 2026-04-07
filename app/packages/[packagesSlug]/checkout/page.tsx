import Header from "@/app/components/Header";
import { Organizer } from "@/app/components/Organizer";
import { ContentTestimonials } from "@/app/components/Testimonials";
import { TPackage } from "@/app/components/WeddingPackages/types";
import Image from "next/image";
import { getData } from "../actions";
import { Form as FormCheckout } from "@/app/packages/[packagesSlug]/checkout/Form";

type Request = {
    params: Promise<{ packagesSlug: string }>
}

export default async function CheckoutPage(request: Request) {
    const { packagesSlug } = await request.params
    const { data: weddingPackage }: { data: TPackage } = await getData(packagesSlug)
    return (
        <main className="flex flex-col gap-y-8 relative py-8 bg-light2">
            <Header />

            <section className="container mx-auto flex flex-col gap-y-4">
                <h2 className="text-3xl font-bold">Checkout Package</h2>

                <div className="flex gap-x-12">
                    <div className="w-8/12">
                        <FormCheckout data={weddingPackage} />
                    </div>

                    <div className="w-4/12">
                        <div className="sticky top-8">
                            <div className="bg-light1 p-7 flex flex-col gap-y-5 rounded-2xl">
                                <h6 className="text-2xl font-bold">
                                    {weddingPackage.name}
                                </h6>
                                <span
                                    className="relative w-full aspect-video rounded-2xl overflow-hidden"
                                >
                                    <Image
                                        src={weddingPackage.thumbnail}
                                        className="w-full h-full object-cover absolute"
                                        fill
                                        alt={weddingPackage.name}
                                        unoptimized={process.env.NODE_ENV === "development"}
                                    />
                                </span>

                                <h6 className="text-2xl text-color2 font-bold">Rp {weddingPackage.price.toLocaleString('id-ID')}</h6>
                                <hr />
                                <h6 className="font-bold">Happy Story</h6>
                                <ContentTestimonials key={weddingPackage.weddingTestimonials.map((item) => item.id).join(',')} data={weddingPackage.weddingTestimonials} />

                                <hr />
                                <h6 className="font-bold">Wedding Organizer</h6>
                                <Organizer organizer={weddingPackage.weddingOrganizer} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}