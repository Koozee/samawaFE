"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const mainMenus = [
        {
            key: "home",
            label: "Home",
            slug: "/",
        },
        {
            key: "category",
            label: "Category",
            slug: "/category",
        },
        {
            key: "packages",
            label: "Packages",
            slug: "/packages",
        },
        {
            key: "testimonials",
            label: "Testimonials",
            slug: "/testimonials",
        },
    ];

    return (
        <>
            <header
                className="flex justify-between container mx-auto items-center p-8 -mb-8"
            >
                <span className="flex gap-x-3 items-center">
                    <Image
                        src="/images/logo-samawa.svg"
                        alt="Logo Samawa"
                        width={40}
                        height={42}
                    />
                    <span className="text-2xl font-bold cursor-default">Samawa</span>
                </span>
                <ul className="flex gap-x-10">
                    {mainMenus?.map(menu => {
                        let isActive = false
                        if (pathname === menu.slug || (pathname.startsWith(menu.slug) && pathname.charAt(menu.slug.length) === '/')) {
                            isActive = true;
                        }
                        return (
                            <li key={menu.key} >
                                <Link
                                    href={menu.slug}
                                    className={`hover:underline ${isActive ? 'text-color2 font-bold' : ''}`}
                                    aria-current={isActive ? "true" : "false"}
                                >{menu.label}</Link>
                            </li>
                        );
                    })}
                </ul>

                <ul className="flex gap-x-4">
                    <li>
                        <Link
                            href="/contacts"
                            className="border border-dark1 px-5 py-3 rounded-full font-semibold"
                        >Contact Us</Link
                        >
                    </li>
                    <li>
                        <Link
                            href="/bookings"
                            className="border transparent bg-color2 text-light1 px-5 py-3 rounded-full font-semibold"
                        >Booking</Link>
                    </li>
                </ul>
            </header >
        </>
    );
};