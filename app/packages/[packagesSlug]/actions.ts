export async function getData(slug: string) {
    const res = await fetch(
        `${process.env.NEXT_API_URI}/wedding-package/${slug}`,
        {
            cache: "no-cache"
        }
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}