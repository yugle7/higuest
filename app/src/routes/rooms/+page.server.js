import { addId } from '$lib';
import { default_params } from '$lib/data/room';

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

const getRooms = async (pb, house_id) => {
    const filter = house_id ? `house_id="${house_id}"` : null;

    const res = await pb.collection('rooms').getFullList({ filter });
    res.forEach(r => {
        r.house.id = r.house_id;
        delete r.house_id;
        r.photos = r.photos.map((p, i) => ({ id: i, url: pb.files.getUrl(r, p) }));
    })

    return res;
}

const loadRooms = async (pb, profile, params) => {
    const { house_id, check_in, check_out } = params;

    let rooms;

    if (check_in) {
        const filters = [`check_in=${check_in}`, `check_out>=${check_out}`];
        if (house_id) filters.push(`house_id="${house_id}"`);

        const res = await pb.collection('room_checks').getFullList({
            filter: filters.join('&&'),
            expand: 'room_id'
        });

        rooms = res.map(({ house_id, expand }) => {
            const { room_id } = expand;
            const room = room_id;

            room.house.id = house_id;
            delete room.house_id;

            return room;
        });
    } else {
        rooms = await getRooms(pb, house_id);
    }

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
                react_id: addId(house_id, profile.id)
            });
        }
    }
}