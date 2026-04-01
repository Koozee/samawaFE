import { TPackage } from "@/app/components/WeddingPackages/types";

export type TTestimonial = {
    id: number;
    name: string;
    occupation: string;
    photo: string;
    message: string;
    length: number;
    weddingPackage: TPackage;
}