export async function getData() {
    try {
        const url = `${process.env.NEXT_API_URI}/cities`;
        const res = await fetch(url, { method: "GET", cache: "no-cache" })
        return res.json();
    } catch (error) {
        console.error(error)
    }
}