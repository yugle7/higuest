import { redirect } from "@sveltejs/kit";
import { sumPrice } from "$lib/data/price";
import { setPhotos } from "$lib/data/photo";
import { getDate } from "$lib/data/time";
import { addId } from '$lib';

const loadChecked = async (pb, rooms) => {
    const filter = rooms.map(({ id }) => `room_id="${id}"`).join('||');

    const res = await pb.collection('checks').getFullList({ filter });
    return new Set(res.map(({ date }) => date));
};

const loadRooms = async (pb, room_ids, house_id) => {
    const filter = room_ids ? room_ids.split(' ').map(id => `id="${id}"`).join('||') : `house_id="${house_id}"`;
    const res = await pb.collection('rooms').getFullList({ filter });
    res.forEach(setPhotos(pb));
    return res;

};

export async function load({ locals, url }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const room_ids = url.searchParams.get('room_ids');
    const house_id = url.searchParams.get('house_id');

    const rooms = await loadRooms(pb, room_ids, house_id);
    const checked = await loadChecked(pb, rooms);
    const house = await pb.collection('houses').getOne(house_id);

    return { rooms, house, checked, profile };
}


const addChecks = async (pb, order) => {
    const { room_ids, house_id, check_in, check_out } = order;

    const actions = [];

    let date = check_in;
    while (date < check_out) {
        room_ids.forEach(room_id => actions.push(
            pb.collection('checks').create({ id: addId(room_id, '0000000' + date), room_id, house_id, date })
        ));
        date = getDate(date + 1);
    }
    await Promise.all(actions);
};

const addRooms = async (pb, order) => {
    const { room_ids, house_id, check_in, check_out } = order;

    const filter = room_ids ? room_ids.map(id => `id="${id}"`).join('||') : `house_id="${house_id}"`;
    const rooms = await pb.collection('rooms').getFullList({ filter });

    order.rooms = rooms.map(({ number, name, floor, area }) => ({ number, name, floor, area }));

    if (room_ids) order.price = sumPrice(check_in, check_out, rooms);
    if (!room_ids) order.room_ids = rooms.map(({ id }) => id);
};

const addHouse = async (pb, order) => {
    const { room_ids, house_id, check_in, check_out } = order;

    const { title, street, building } = await pb.collection('houses').getOne(house_id);
    order.house = { title, street, building };

    if (!room_ids) order.price = sumPrice(check_in, check_out, rooms);
};


export const actions = {
    default: async ({ request, url, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();

        const order = JSON.parse(data.get('data'));
        order.phone = data.get('phone');
        order.client = { fullname: data.get('fullname') };

        const contacts = data.get('contacts');
        if (contacts) order.client.contacts = contacts.split(',');

        if (profile) {
            const { id, username } = profile;
            order.client_id = id;
            order.client.username = username;
        }

        const room_ids = url.searchParams.get('room_ids');
        if (room_ids) order.room_ids = room_ids.split(' ');
        order.house_id = url.searchParams.get('house_id');

        await addHouse(pb, order);
        await addRooms(pb, order);

        await addChecks(pb, order);

        const res = await pb.collection('orders').create(order);
        redirect(303, `/orders/${res.id}`);
    }
};