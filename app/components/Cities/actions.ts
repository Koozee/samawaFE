export async function getData() {
    try {
        const url = `${process.env.BASE_API_URI}/cities`;
        const res = await fetch(url, { method: "GET", cache: "no-cache" })
        return res.json();
    } catch (error) {
        console.error(error)
    }
}