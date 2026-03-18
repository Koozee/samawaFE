import { TShow } from "./types";

export async function getData(show: TShow) {
    try {
        let url = `${process.env.BASE_API_URI}/wedding-packages`;
        if (show === 'popular') url = `${process.env.BASE_API_URI}/wedding-packages/popular`
        const res = await fetch(url, { method: "GET", cache: "no-cache" })
        return res.json();
    } catch (error) {
        console.error(error)
    }
}