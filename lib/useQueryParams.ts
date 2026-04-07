"use client";

import { useSearchParams } from "next/navigation";

export default function useQueryParams() {
    const query = useSearchParams();

    let queryParams: { [key: string]: string } = {}

    query.forEach((value, key) => {
        queryParams[key] = value;
    })

    return queryParams;
}