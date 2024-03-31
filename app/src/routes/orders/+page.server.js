import { redirect } from '@sveltejs/kit';
import { default_params } from '$lib/data/order';

async function loadOrders(pb, profile, params) {
    const { sort, client_id, house_id, room_id } = params;

    const filters = [];

    if (client_id) filters.push(`client_id="${client_id}"`);
    if (house_id) filters.push(`house_id="${house_id}"`);
    if (room_id) filters.push(`room_ids~"${room_id}"`);

    const res = await pb.collection('orders').getFullList({
        filter: filters.join('&&'),
        expand: 'house_id',
        sort
    });

    const orders = [];
    res.forEach(order => {
        const { client_id, expand } = order;
        const { manager_ids } = expand.house_id;

        if (profile.role >= 2 || client_id === profile.id || manager_ids.includes(profile.id)) {
            orders.push(order);
        }
    });
    return orders;
}

export async function load({ locals, url }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    if (!profile) throw redirect(303, '/login');

    const params = { ...default_params };
    for (const key of ['sort', 'client_id', 'house_id', 'room_id']) {
        params[key] = url.searchParams.get(key) || params[key];
    }
    return {
        orders: loadOrders(pb, profile, params),
        profile,
        params
    };
}
