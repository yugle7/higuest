import { addId } from "$lib";
import { error } from "@sveltejs/kit";
import { setPhotos } from "$lib/data/photo";

async function getReact(pb, profile_id, house_id) {
    const id = addId(house_id, profile_id);
    try {
        const { react } = await pb.collection('house_reacts').getOne(id);
        return react;
    } catch (err) {
        console.log(err.message);
    }
    return 0;
}

async function getReacts(pb, profile_id, house_id) {
    const reacts = {};

    try {
        const res = await pb.collection('room_reacts').getFullList({
            filter: `house_id="${house_id}"&&profile_id="${profile_id}"`
        });
        res.forEach(({ room_id, react }) => reacts[room_id] = react);
    } catch (err) {
        console.log(err.message);
    }
    return reacts;
}

async function loadHouse(pb, profile, id) {
    try {
        const res = await pb.collection('houses').getOne(id);
        if (profile) res.react = await getReact(pb, profile.id, id);
        setPhotos(pb)(res);

        return res;

    } catch (err) {
        console.log(err.message);
        error(404, 'нет такого дома')
    }
}

async function loadRooms(pb, profile, house_id) {
    const rooms = await pb.collection('rooms').getFullList({ filter: `house_id="${house_id}"`, sort: 'number' });

    if (profile) {
        const reacts = await getReacts(pb, profile.id, house_id);
        rooms.forEach(r => (r.react = reacts[r.id]));
        rooms.forEach(setPhotos(pb));
    }
    return rooms;
}


export async function load({ params, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const { id } = params;

    const house = await loadHouse(pb, profile, id);
    const rooms = await loadRooms(pb, profile, id);

    house.managed = profile && (profile.role >= 2 || house.manager_ids.includes(profile.id));
    return { house, rooms, profile };
}
