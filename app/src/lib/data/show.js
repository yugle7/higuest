export function parseUsernames(text) {
    return text.match(/(^|\s)@[a-z]{3,}\b/g)?.map((u) => u.substr(u[0] === '@' ? 1 : 2)) || [];
}

export function getPlural(k, names) {
    const d = Math.floor(k / 10);
    const m = k % 10;
    let i = 2;
    if (m === 1) {
        if (k != 11) i = 0;
    } else if (d != 1 && 1 < m && m < 5) {
        i = 1;
    }
    return names[i];
}

export const plural = (k, names) => `${k} ${getPlural(k, names)}`;
