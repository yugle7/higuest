import { addId } from "$lib";
import { error } from "@sveltejs/kit";
import { setPhotos } from "../../../lib/data/photo.js";

async function getReact(pb, profile_id, room_id) {
    const id = addId(room_id, profile_id);
    try {
        const { react } = await pb.collection('room_reacts').getOne(id);
        return react;
    } catch (err) {
        console.log(err.message);
    }
    return 0;
}


async function loadRoom(pb, profile, id) {
    try {
        const res = await pb.collection('rooms').getOne(id, { expand: 'house_id' });
        if (profile) res.react = await getReact(pb, profile.id, id);

        setPhotos(pb)(res);
        return res;

    } catch (err) {
        console.log(err.message);
        error(404, 'нет такого номера')
    }
}

function getHouse(room, profile) {
    const { expand } = room;
    delete room.expand;

    const house = expand.house_id;
    if (profile) house.managed = profile.role >= 2 || house.manager_ids.includes(profile.id);

    return house;
}

export async function load({ params, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const { id } = params;

    const room = await loadRoom(pb, profile, id);
    const house = getHouse(room, profile);

    return { room, house, profile };
}
