import { TPackage } from "@/app/components/WeddingPackages/types";

export type TBooking = {
    id: string,
    name: string,
    phone: string,
    email: string,
    proof: string,
    price: number,
    booking_trx_id: string,
    is_paid: boolean,
    total_amount: number,
    total_tax_amount: number,
    started_at: string,
    wedding_package: TPackage
}