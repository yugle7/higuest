import { plural } from "./show";

export const default_params = {
    sort: '-like',
    adults: 1,
    kids: 0,
    children: 0,
    cars: 0
}

export const offer_sort = {
    '-like': 'Лучшие',
    'price': 'Дешевые',
    '-price': 'Дорогие'
};

export const getAddress = (house) => house.street + ' ' + house.building;

export const getCounts = (offer) => {
    const { adults, children, kids, cars } = offer;
    const guests = plural(+adults + children + kids, ['гость', 'гостя', 'гостей']);
    if (cars == 0) return guests;
    if (cars == 1) return `${guests} на машине`;
    return `${guests} на ${cars} машинах`;
}