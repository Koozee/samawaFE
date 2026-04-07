"use client"

import Header from "@/app/components/Header";
import { InputForm } from "@/app/components/InputForm";
import CalendarIcon from '@/public/images/calendar.svg'
import PhoneIcon from '@/public/images/phone.svg'
import { useActionState, useEffect } from "react";
import { findBooking } from "./actions";
import toast from "react-hot-toast";

type State = {
    errors: string[]
    status: string
}

const initialState: State = {
    errors: [],
    status: 'idle'
}

export default function BookingsPage() {
    const [state, formAction, pending] = useActionState(findBooking, initialState);

    useEffect(() => {
        if (state.status === 'error' && state.errors.length > 0) {
            toast.error(state.errors.join(', '));
        } else if (state.status === 'success') {
            toast.success('Booking berhasil ditemukan!');
        }
    }, [state]);

    return (
        <main className="flex flex-col gap-y-8 relative bg-light2 min-h-screen">
            <Header />

            <section className="container mx-auto relative z-20 flex justify-center items-center mt-10">
                <form
                    action={formAction}
                    className="bg-light1 rounded-2xl flex flex-col gap-y-5 w-4/12 p-5"
                >
                    <h1 className="text-xl font-bold">Check My Booking</h1>

                    <div className="flex flex-col w-full gap-y-2">
                        <InputForm name="Booking ID" id="booking_trx_id" placeholder="Write your Booking ID" icon={<CalendarIcon width={24} height={24} />} />
                    </div>

                    <div className="flex flex-col w-full gap-y-2">
                        <InputForm name="Phone" id="phone" placeholder="Your number when checkout" icon={<PhoneIcon width={24} height={24} />} />
                    </div>

                    <button
                        type="submit"
                        disabled={pending}
                        aria-disabled={pending}
                        className={`bg-color2 text-light1 font-semibold gap-x-2 flex items-center justify-center py-3 rounded-full w-full cursor-pointer ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span>{pending ? 'Finding...' : 'Find Booking Details'}</span>
                    </button>
                </form>
            </section>
        </main>
    )
}