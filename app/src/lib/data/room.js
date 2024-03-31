export const getRoom = (room) => {
    const { number, name, photos, about, amenities, price, floor, area, adults, children, kids } = room;
    return { number, name, photos, about, amenities: [...amenities], price: [...price], floor, area, adults, children, kids };
};

export const default_params = {
    sort: '-like',
    status: 5
}

export const room_sort = {
    '-price': 'По цене',
    '-like': 'Лучшие'
};
