import { addId } from "$lib";
import { getAuthor } from "$lib/data/user";
import { redirect } from "@sveltejs/kit";

async function loadReacts(pb, talk_id) {
    const res = await pb.collection('reacts').getFullList({
        filter: `talk_id="${talk_id}"`
    });
    const reacts = {};
    res.forEach((r) => (reacts[r.message_id] = r.react));
    return reacts;
}

async function loadTalk(pb, profile_id, chat_id) {
    const id = addId(profile_id, chat_id);
    let talk;

    try {
        talk = await pb.collection('talks').getOne(id);
        if (talk.message_id) await pb.collection('talks').update(id, { message_id: null });
        talk.reacts = await loadReacts(pb, id);
    } catch (err) {
        console.log(err.message);

        talk = await pb.collection('talks').create({
            id,
            profile_id,
            chat_id,
            deleted: true
        });
        talk.reacts = {};
    }
    return talk;
}

async function loadMessages(pb, chat_id) {
    return await pb.collection('messages').getFullList({
        filter: `chat_id="${chat_id}"`,
        sort: 'created'
    });
}

async function loadChat(pb, room) {
    const { id, name } = room;
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, id);
    } catch (err) {
        console.log(err.message);

        chat = await pb.collection('chats').create({
            id,
            title: name,
            type: 3,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

export async function load({ parent, url, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    if (url.searchParams.get('type') !== '3') return {};

    const { room } = await parent();
    if (!room) return {};

    const chat = await loadChat(pb, room)
    if (!profile) return { chat };

    const talk = await loadTalk(pb, profile.id, chat.id);
    return { chat, talk }
}


const loadRoom = async (pb, id) => {
    const { house_id, house, number, name, floor, amenities, area } = await pb.collection('rooms').getOne(id);

    const room = { number, name, floor, amenities, area };
    return { room, house, house_id };
}


export const actions = {
    edit: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const room = JSON.parse(data.get('data'));
        await pb.collection('rooms').update(params.id, room);

        return { success: true };
    },
    order: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const room_id = params.id;

        const { room, house, house_id } = await loadRoom(pb, room_id);
        const order = JSON.parse(data.get('order'));

        order.room_ids = [room_id];
        order.rooms = [room];

        order.house_id = house_id;
        order.house = house;

        order.client_id = profile.id
        order.client = getAuthor(profile);

        const { check_in, check_out } = order;
        const checks = await pb.collection('room_checks').getFullList({
            filter: `room_id="${room_id}"&&check_in<${check_out}&&check_out>${check_in}`
        })

        await Promise.all(
            checks.map(({ id, check_in }) => pb.collection('room_checks').update(id, {
                check_out: Math.max(order.check_in, check_in)
            }))
        );

        const { id } = await pb.collection('orders').create(order);
        throw redirect(303, `/orders/${id}`);
    }
}