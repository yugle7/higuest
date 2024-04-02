import { holidays } from './day';
import { getDate } from './time';

export const getPrice = (check_in, check_out, price) => {
    let p = 0;
    for (let i = 1; i < price.length; i++) price[i] ||= price[i - 1];

    let d = check_in;
    while (d < check_out) {
        p += price[holidays[d] || 0];
        d = getDate(d + 1);
    }
    return p;
}

export const sumPrice = (check_in, check_out, rooms) =>
    rooms
        .map(({ price }) => getPrice(check_in, check_out, price))
        .reduce((a, b) => a + b, 0);

