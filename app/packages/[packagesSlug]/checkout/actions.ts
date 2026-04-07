"use server"
import { redirect } from "next/navigation";
import { z } from "zod"

const schema = z.object({
    name: z.string().min(3, 'Nama harus terdiri dari minimal 3 karakter'),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Alamat email tidak valid'),
    phone: z.string().min(10, 'Nomor telepon harus terdiri dari minimal 10 angka'),
    started_at: z.string().min(1, 'Tanggal mulai wajib diisi'),
    proof: z.instanceof(File, { message: 'Bukti pembayaran wajib diunggah' }).refine((file) => file.size > 0, "Bukti pembayaran wajib diunggah"),
    wedding_package_id: z.string().min(1, 'Wedding package ID wajib diisi'),
})

export async function createOrder(prevState: any, formData: FormData) {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        started_at: formData.get('started_at'),
        proof: formData.get('proof'),
        wedding_package_id: formData.get('wedding_package_id')
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
        const response = await fetch(`${process.env.NEXT_API_URI}/booking-transaction`, {
             method: 'POST',
             body: formData 
        })

        if (!response.ok) {
            const data = await response.json()
            return {
                errors: data.errors || ['Gagal mengirim pesanan'],
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

    redirect(`/packages/${formData.get('slug')}/checkout/success?bookingId=${resultData.data.booking_trx_id}`);
}
