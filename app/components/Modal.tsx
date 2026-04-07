"use client"

import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

export function PreventScrolling() {
    useLayoutEffect(() => {
        document.querySelector("body")?.classList.add("overflow-hidden");

        return () => {
            document.querySelector("body")?.classList.remove("overflow-hidden");
        }
    }, []);
    return null;
}

export function RouterBack() {
    const router = useRouter();

    return <div className="absolute inset-0 z-10 cursor-pointer" onClick={() => router.back()}></div>
}

export function CloseModalButton() {
    const router = useRouter();
    
    return (
        <button
            onClick={() => router.back()}
            className="border border-dark1 px-5 py-3 rounded-full font-semibold cursor-pointer w-max"
        >
            Close Details
        </button>
    )
}