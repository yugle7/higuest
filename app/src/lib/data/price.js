import { holidays } from './day';
import { getDate } from './time';

export const getPrice = (check_in, check_out, price) => {
    let p = 0;
    while (check_in < check_out) {
        p += price[holidays[check_in] || 0];
        check_in = getDate(check_in + 1);
    }
    return p;
}

export const sumPrice = (check_in, check_out, rooms) =>
    rooms
        .map(({ price }) => getPrice(check_in, check_out, price))
        .reduce((a, b) => a + b, 0);

