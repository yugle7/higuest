import { redirect } from "@sveltejs/kit";
import { sumPrice } from "$lib/data/price";
import { setPhotos } from "$lib/data/photo";

const loadChecked = async (pb, rooms) => {
    const filter = rooms.map(({ id }) => `room_id="${id}"`).join('||');

    const res = await pb.collection('room_checks').getFullList({
        filter: `(${filter})&&check_in=check_out`
    });
    return new Set(res.map(({ check_in }) => check_in));
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
    const { room_ids, check_in, check_out } = order;

    const filter = room_ids.map(id => `room_id="${id}"`).join('||');
    const checks = await pb.collection('room_checks').getFullList({
        filter: `(${filter})&&check_in<${check_out}&&check_out>${check_in}`
    });
    await Promise.all(
        checks.map(({ id, check_in }) => pb.collection('room_checks').update(id, {
            check_out: Math.max(order.check_in, check_in)
        }))
    );
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