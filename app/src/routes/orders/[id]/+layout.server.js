import { error } from "@sveltejs/kit";


async function loadOrder(pb, id) {
    try {
        return await pb.collection('orders').getOne(id);

    } catch (err) {
        console.log(err.message);
        error(404, 'нет такого заказа')
    }
}

export async function load({ params, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const order = await loadOrder(pb, params.id);
    const { house, house_id, rooms, room_ids, client, client_id } = order;

    rooms.forEach((r, i) => r.id = room_ids[i]);
    house.id = house_id;
    client.id = client_id;

    const { manager_ids } = await pb.collection('houses').getOne(house_id);
    profile.manager = profile && profile.role >= 2 && manager_ids.includes(profile.id);

    return { order, profile };
}
