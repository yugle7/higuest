import { addId } from '$lib';
import { default_params } from '$lib/data/room';
import { setPhotos } from '../../lib/data/photo.js';

async function loadReacts(pb, profile) {
    const res = await pb.collection('room_reacts').getFullList({
        filter: `profile_id="${profile.id}"`
    });
    if (res.length) {
        const reacts = {};
        res.forEach(({ room_id, react }) => (reacts[room_id] = react));
        return reacts;
    }
}

const loadRooms = async (pb, profile, params) => {
    const { house_id, check_in, check_out } = params;

    let rooms;

    if (check_in) {
        const filters = [`date>=${check_in}`, `date<${check_out}`];
        if (house_id) filters.push(`house_id="${house_id}"`);

        const res = await pb.collection('checks').getFullList({ filter: filters.join('&&') });
        const room_ids = new Set(res.map(({ room_id }) => room_id));

        const filter = [...room_ids].map(({ room_id }) => `id!="${room_id}"`).join('&&');
        rooms = await pb.collection('rooms').getFullList({ filter });

    } else {
        const filter = house_id ? `house_id="${house_id}"` : null;
        rooms = await pb.collection('rooms').getFullList({ filter });
    }

    rooms.forEach(r => {
        r.house.id = r.house_id;
        delete r.house_id;
    });
    rooms.forEach(setPhotos(pb));

    const reacts = profile && await loadReacts(pb, profile);
    if (reacts) rooms.forEach(r => r.react = reacts[r.id]);

    return rooms;
}

export async function load({ locals, url }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const params = { ...default_params };
    for (const key of ['sort', 'adults', 'children', 'kids', 'cars', 'check_in', 'check_out', 'house_id']) {
        const value = url.searchParams.get(key);
        if (value) params[key] = value;
    }
    return {
        rooms: loadRooms(pb, profile, params),
        profile,
        params
    };
}

export const actions = {
    react: async ({ request, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        console.log(data);

        const room_id = data.get('room_id');
        const react = +data.get('react');

        const id = addId(profile.id, room_id);

        try {
            const res = await pb.collection('room_reacts').getOne(id);

            if (res.react === react) return;
            await pb.collection('room_reacts').update(id, { react });

            const data = {};
            if (res.react > 0) data[res.react + '-'] = 1;
            if (react > 0) data[react + '+'] = 1;

            await pb.collection('rooms').update(room_id, data);

        } catch (err) {
            console.log(err.message);

            const { house_id } = await pb.collection('rooms').update(room_id, { [react + '+']: 1 });

            await pb.collection('room_reacts').create({
                id,
                react,
                profile_id: profile.id,
                room_id,
                house_id
            });
        }
    }
}