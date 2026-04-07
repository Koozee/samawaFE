"use client"

import ArrowIcon from '@/public/images/arrow.svg'
import PersonIcon from '@/public/images/person.svg'
import MailIcon from '@/public/images/mail.svg'
import PhoneIcon from '@/public/images/phone.svg'
import CalendarIcon from '@/public/images/calendar.svg'
import ProtectIcon from '@/public/images/protect.svg'
import WalletIcon from '@/public/images/wallet.svg'
import CreditCardIcon from '@/public/images/credit-card.svg'
import ReceiptIcon from '@/public/images/receipt.svg'
import CurrencyIcon from '@/public/images/currency.svg'
import TaxIcon from '@/public/images/tax.svg'
import CommentsIcon from '@/public/images/comments.svg'
import ServerShieldIcon from '@/public/images/server-shield.svg'
import VerifiedIcon from '@/public/images/verified.svg'
import BCAIcon from '@/public/images/bank-bca.svg'
import MandiriIcon from '@/public/images/bank-mandiri.svg'
import NotesProofIcon from '@/public/images/notes-proof.svg'
import { TPackage } from '@/app/components/WeddingPackages/types'
import { useActionState, useEffect } from 'react'
import { createOrder } from './actions'
import { InputForm } from '@/app/components/InputForm'
import toast from 'react-hot-toast'

type Props = {
    data: TPackage
}

type State = {
    errors: string[]
    status: string
}

const initialState: State = {
    errors: [],
    status: 'idle'
}


export function Form({ data }: Props) {
    const [state, formAction, pending] = useActionState(createOrder, initialState);

    useEffect(() => {
        if (state.status === 'error' && state.errors.length > 0) {
            toast.error(state.errors.join(', '));
        } else if (state.status === 'success') {
            toast.success('Pesanan berhasil dibuat!');
        }
    }, [state]);
    return (
        <form action={formAction}>
            <input type="hidden" name="wedding_package_id" value={data.id} />
            <input type="hidden" name="slug" value={data.slug} />
            <div className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-5 bg-white rounded-2xl p-7">
                    <input
                        type="checkbox"
                        name="accordion"
                        id="customer-information"
                        className="peer hidden"
                        defaultChecked
                    />
                    <label
                        htmlFor="customer-information"
                        className="flex justify-between [--state-rotate:0deg] peer-checked:[--state-rotate:180deg] cursor-pointer"
                    >
                        <h6 className="text-xl font-bold">Customer Information</h6>
                        <span
                            className="text-color2 flex items-center justify-center transition-all duration-300 rotate-(--state-rotate)"
                        >
                            <ArrowIcon width={24} height={24} />
                        </span>
                    </label>
                    <div
                        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:max-h-screen"
                    >
                        <hr />
                        <div className="grid grid-cols-2 gap-5">
                            <InputForm name="Name" id="name" placeholder="Write your complete name" icon={<PersonIcon width={24} height={24} />} />

                            <InputForm name="Email" id="email" placeholder="Write your complete email" icon={<MailIcon width={24} height={24} />} />

                            <InputForm name="Phone" id="phone" placeholder="Let us know your number" icon={<PhoneIcon width={24} height={24} />} />

                            <InputForm name="Started At" id="started_at" placeholder="Write your complete date" icon={<CalendarIcon width={24} height={24} />} type="date" />
                        </div>

                        <hr />

                        <span className="flex items-center gap-x-2 text-color4">

                            <ProtectIcon width={24} height={24} />
                            <span>Samawa is protecting your privacy better</span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 bg-white rounded-2xl p-7">
                    <input
                        type="checkbox"
                        name="accordion"
                        id="payment-details"
                        className="peer hidden"
                        defaultChecked
                    />
                    <label
                        htmlFor="payment-details"
                        className="flex justify-between [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                    >
                        <h6 className="text-xl font-bold">Payment Details</h6>
                        <span
                            className="text-color2 flex items-center justify-center transition-all duration-300 rotate-(--state-rotate)"
                        >
                            <ArrowIcon width={24} height={24} />
                        </span>
                    </label>
                    <div
                        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen"
                    >
                        <hr />
                        <div className="flex items-center gap-x-3">
                            <span className="text-color2">
                                <ReceiptIcon width={24} height={24} />
                            </span>
                            <span className="">Package Quantity</span>
                            <span className="font-bold ml-auto">1 Wedding Package</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <span className="text-color2">
                                <CurrencyIcon width={24} height={24} />
                            </span>
                            <span className="">Package Price (1x)</span>
                            <span className="font-bold ml-auto">Rp {data.price.toLocaleString('id-ID')}</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <span className="text-color2">
                                <TaxIcon width={24} height={24} />
                            </span>
                            <span className="">Country Tax 11%</span>
                            <span className="font-bold ml-auto">Rp {(data.price * 0.11).toLocaleString('id-ID')}</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <span className="text-color2">
                                <CommentsIcon width={24} height={24} />
                            </span>
                            <span className="">Consultation & Insurance</span>
                            <span className="font-bold ml-auto">Rp 0 (Free)</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <span className="text-color2">
                                <ServerShieldIcon width={24} height={24} />
                            </span>
                            <span className="">Grand Total Amount</span>
                            <span className="font-bold text-xl text-color2 ml-auto"
                            >Rp {(data.price * 1.11).toLocaleString('id-ID')}</span
                            >
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 bg-white rounded-2xl p-7">
                    <input
                        type="checkbox"
                        name="accordion"
                        id="proceed-payment"
                        className="peer hidden"
                        defaultChecked
                    />
                    <label
                        htmlFor="proceed-payment"
                        className="flex justify-between [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
                    >
                        <h6 className="text-xl font-bold">Proceed Payment to</h6>
                        <span
                            className="text-color2 flex items-center justify-center transition-all duration-300 rotate-(--state-rotate)"
                        >
                            <ArrowIcon width={24} height={24} />
                        </span>
                    </label>
                    <div
                        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen"
                    >
                        <hr />

                        <div className="flex gap-x-5">
                            <button
                                type="button"
                                className="border border-color2 gap-x-2 flex items-center justify-center py-3 rounded-full w-full"
                            >
                                <WalletIcon className="text-color2" width={24} height={24} />

                                <span>Bank Transfer</span>
                            </button>

                            <button
                                type="button"
                                className="border border-light3 gap-x-2 flex items-center justify-center py-3 rounded-full w-full"
                            >
                                <WalletIcon className="text-color2" width={24} height={24} />

                                <span>Credit Card</span>
                            </button>

                            <button
                                type="button"
                                className="border border-light3 gap-x-2 flex items-center justify-center py-3 rounded-full w-full"
                            >
                                <CreditCardIcon className="text-color2" width={24} height={24} />

                                <span>Redeem Points</span>
                            </button>
                        </div>

                        <div className="flex gap-x-5">
                            <div className="w-6/12 flex gap-x-4 items-center">
                                <BCAIcon width={64} height={64} />
                                <span className="flex flex-col">
                                    <span className="flex gap-x-2">
                                        <span className="font-semibold">Samawa Indonesia</span>
                                        <VerifiedIcon className="text-color4" width={18} height={18} />
                                    </span>
                                    <span>8008129839</span>
                                </span>
                            </div>

                            <div className="w-6/12 flex gap-x-4 items-center">
                                <MandiriIcon width={64} height={64} />

                                <span className="flex flex-col">
                                    <span className="flex gap-x-2">
                                        <span className="font-semibold">Samawa Indonesia</span>
                                        <VerifiedIcon className="text-color4" width={18} height={18} />
                                    </span>
                                    <span>12379834983281</span>
                                </span>
                            </div>
                        </div>

                        <hr />

                        <div className="flex flex-col w-full gap-y-2">
                            <label htmlFor="proof" className="text-xl font-bold"
                            >Upload Proof of Payment</label
                            >
                            <div className="flex relative">
                                <span
                                    className="absolute left-0 bottom-0 top-0 aspect-square flex items-center justify-center text-color2"
                                >
                                    <NotesProofIcon width={24} height={24} />
                                </span>
                                <input
                                    type="file"
                                    className="pl-10 block file:hidden appearance-none w-full py-3 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-full"
                                    name="proof"
                                    id="proof"
                                    placeholder="Add an attachment"
                                />
                            </div>
                        </div>
                        <hr />

                        <div className="flex gap-x-5">
                            <button
                                type="button"
                                className="border border-dark1 gap-x-2 flex items-center font-semibold justify-center py-3 rounded-full w-full"
                            >
                                <span>Save as a Wishlist</span>
                            </button>
                            <button
                                type="submit"
                                aria-disabled={pending}
                                disabled={pending}
                                className={`bg-color2 text-light1 font-semibold gap-x-2 flex items-center justify-center py-3 rounded-full w-full ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span>{pending ? 'Loading...' : 'Confirm Payment'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    )
}