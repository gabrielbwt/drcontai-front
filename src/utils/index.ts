export function truncateString(str: string, num: number = 60) {

    if (str?.length <= num) {
        return str
    }
    return str?.slice(0, num) + '...'
}