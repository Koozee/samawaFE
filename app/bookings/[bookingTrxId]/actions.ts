export async function getData(bookingTrxId: string, phone: string) {
    try {
        const response = await fetch(`${process.env.NEXT_API_URI}/check-booking`, {
            method: 'POST',
            body: JSON.stringify({
                booking_trx_id: bookingTrxId,
                phone: phone,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache'
        })

        if (!response.ok) {
            return {
                errors: ["Booking tidak ditemukan"],
                status: 'error'
            }
        }

        const resultData = await response.json();
        return resultData;
    } catch (error) {
        console.error("Terjadi masalah:", error);
        return {
            errors: ['Terjadi kesalahan internal server'],
            status: 'error'
        }
    }
}