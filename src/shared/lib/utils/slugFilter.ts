export const slugFilter = (slug: string) => {
    return slug.split("/").filter((s) => s.trim()).pop() || "";
}