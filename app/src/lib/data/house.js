import { plural, getPlural } from "./show";

export const default_params = {
    sort: '-like',
    status: 5
}

export const house_sort = {
    '-like': 'Лучше',
    '-price': 'Дешевле'
};

export const house_status = [
    'Сохранен',
    'Заявлен',
    'Архив',
    'Дубль',
    'Отбор',
    'Одобрен'
];

export const house_category = [
    'Семейный',
    'Туристический',
    'Курортный',
    'Научный',
    'Пенсионный',
    'Детский'
];

export function getStatuses(profile, house) {
    switch (house.status) {
        case 1:
            return profile.role >= 2 ? [0, 2, 3, 4] : [0, 2, 3];
        case 0:
        case 2:
        case 3:
        case 5:
            return [1];
        case 4:
            return profile.role >= 2 ? [1, 5] : [1];
        default:
            return [];
    }
}

export const getAddress = (house) => {
    const { city, street, building } = house;
    if (!city) return null;
    return `${city}, ${street} ${building}`;
};

export const getSubtitle = (house) => {
    const { categories, like } = house;
    const names = [categories.map((c) => house_category[c]).join(', ')];
    if (like) names.push(like);
    return names.join(' – ');
}

export const toCars = (house) => getPlural(house.cars || 0, ['парковочное место', 'парковочных места', 'парковочных мест']);

export const getCars = (house) => house.cars && plural(house.cars, ['парковочное место', 'парковочных места', 'парковочных мест']);

export const getRooms = (house) => house.rooms && plural(house.rooms, ['номер', 'номера', 'номеров']);

export function getHouse(house) {
    const { title, text, categories, status } = house;
    return { title, text, categories, status };
}

export const getCount = (rooms, key) => rooms.map((room) => room[key]).reduce((a, b) => a + b, 0)
