"use server"
import { redirect } from "next/navigation";
import { z } from "zod"

const schema = z.object({
    booking_trx_id: z.string().min(1, 'Booking ID harus diisi'),
    phone: z.string().min(1, 'Nomor telepon harus diisi'),
})

export async function findBooking(prevState: any, formData: FormData) {
    const rawData = {
        booking_trx_id: formData.get('booking_trx_id'),
        phone: formData.get('phone'),
    };

    const validatedFields = schema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.issues.map((err: any) => err.message),
            status: 'error'
        }
    }

    let resultData;
    try {
        const response = await fetch(`${process.env.NEXT_API_URI}/check-booking`, {
            method: 'POST',
            body: formData,
            cache: 'no-cache'
        })

        if (!response.ok) {
            return {
                errors: ["Booking tidak ditemukan"],
                status: 'error'
            }
        }

        resultData = await response.json();
    } catch (error) {
        console.error("Terjadi masalah:", error);
        return {
            errors: ['Terjadi kesalahan internal server'],
            status: 'error'
        }
    }

    redirect(`/bookings/${resultData.data.booking_trx_id}?phone=${resultData.data.phone}`);
}
