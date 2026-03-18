import { TCity } from "@/app/components/Cities/types";
import { TOrganizer } from "@/app/components/Organizer/types";

export type TShow = 'popular' | 'newest';

export type PropsWeddingPackagesWrapper = {
    show: TShow,
    type: 'grid' | 'slider'
}

export type TPackage = {
    id: number,
    name: string,
    slug: string,
    price: number,
    isPopular: boolean,
    thumbnail: string,
    about: string,
    city: TCity
    weddingOrganizer: TOrganizer
}