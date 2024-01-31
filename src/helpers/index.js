export function toLocaleString(value) {
    if (!value) {
        return "-";
    }

    return value.toLocaleString();
}