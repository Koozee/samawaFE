import { TBonusPackage } from "@/app/components/Bonus/types";
import { TCity } from "@/app/components/Cities/types";
import { TOrganizer } from "@/app/components/Organizer/types";
import { TTestimonial } from "@/app/components/Testimonials/types";

export type TShow = 'popular' | 'newest';

export type PropsWeddingPackagesWrapper = {
    show: TShow,
    type: 'grid' | 'slider',
    location?: string
}

export type TPackage = {
    id: number,
    name: string,
    slug: string,
    price: number,
    isPopular: 1 | 0,
    thumbnail: string,
    about: string,
    city: TCity
    photos: {
        id: number,
        photo: string
    }[],
    weddingBonusPackages: TBonusPackage[]
    weddingOrganizer: TOrganizer
    weddingTestimonials: TTestimonial[]
}