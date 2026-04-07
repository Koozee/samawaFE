import { TCity } from '@/app/cities/[citySlug]/types'
import Header from '@/app/components/Header'
import { Testimonials } from '@/app/components/Testimonials'
import WeddingPackages from '@/app/components/WeddingPackages'
import StarIcon from '@/public/images/star.svg'
import type { Metadata } from 'next'
import Link from 'next/link'

type Request = {
    params: Promise<{ citySlug: string }>
}

async function getData(slug: string) {
    const res = await fetch(`${process.env.NEXT_API_URI}/city/${slug}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export async function generateMetadata(
    { params }: Request,
): Promise<Metadata> {
    const slug = (await params).citySlug
    const { data: city }: { data: TCity } = await getData(slug)
    return {
        title: city.name,
        description: `Get your wedding party done in ${city.name}`,
        icons: {
            icon: "/images/logo-samawa.svg",
        },
    }
}


export default async function DetailsCityPage({ params }: Request) {
    const slug = (await params).citySlug
    const { data: city }: { data: TCity } = await getData(slug)
    return (
        <main className="flex flex-col gap-y-16">
            <Header />
            <section className="flex flex-col">
                <div className="container mx-auto flex justify-between items-center mb-8">
                    <span className="flex max-w-sm">
                        <h2 className="text-4xl font-bold">
                            Wedding Packages in {city.name}
                        </h2>
                    </span>

                    <span className="flex flex-col items-end gap-y-2">
                        <span className="flex gap-x-1 text-color3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <StarIcon key={index} width={22} height={20} />
                            ))}
                        </span>
                        <span className="font-bold">{city.weddingPackages_count}</span>
                    </span>
                </div>
            </section>

            <WeddingPackages show="popular" type="slider" location={slug} />
            <section className="container mx-auto flex flex-col px-5">
                <div className="flex justify-center items-center mb-8">
                    <h2 className="text-3xl font-bold max-w-md text-center">
                        Browse Our Best Selection Wedding Packages
                    </h2>
                </div>
                <WeddingPackages show="newest" type="grid" location={slug} />
            </section>

            <section className="flex flex-col">
                <div className="container mx-auto flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold max-w-xs">
                        Happy Stories of Our Wedding
                    </h2>
                    <Link
                        href="/testimonials"
                        className="border border-dark1 px-5 py-3 text-center rounded-full font-semibold"
                    >Explore All</Link>
                </div>
                <Testimonials />
            </section>
        </main>
    )
}