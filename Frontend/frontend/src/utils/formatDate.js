export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-Np", {
        timeZone: "Asia/Kathmandu",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    })
}