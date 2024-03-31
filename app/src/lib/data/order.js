import { plural } from "$lib/data/show";

export const order_sort = {
    'price': 'Дешевые',
    '-price': 'Дорогие',
    '-created': 'Новые',
    'created': 'Старые',
    '-check_in': 'Свежие'
};

export const default_params = {
    sort: '-check_in'
}

export const order_status = ['Запрошено', 'Одобрено', 'Отменено'];

export const getAdults = (order) => order.adults && plural(order.adults, ['взрослый', 'взрослых', 'взрослых']);
export const getChildren = (order) => order.children && plural(order.children, ['подросток', 'подростка', 'подростков']);
export const getKids = (order) => order.kids && plural(order.kids, ['ребёнок', 'ребёнка', 'детей']);

export const getCars = (order) => order.cars && plural(order.cars, ['машина', 'машины', 'машин']);
export const getDays = (order) => order.days && plural(order.days, ['ночь', 'ночи', 'ночей']);

export const getRooms = (order) => {
    if (!order.rooms) return 'весь дом';

    const rooms = order.rooms.length;
    return rooms && plural(rooms, ['номер', 'номера', 'номеров']);
};

export const getGuests = (order) => [getAdults, getChildren, getKids].map(g => g(order)).filter(c => c);
export const getCounts = (order) => [getRooms, getAdults, getChildren, getKids, getCars, getDays].map(g => g(order)).filter(c => c);
