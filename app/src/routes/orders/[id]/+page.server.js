import { addId } from "$lib";
import { asDay, getDate } from "$lib/data/time";

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

const getRooms = (order) => order.rooms.map(({ number }) => number).join(', ') + ' номер';

async function loadChat(pb, order) {
    const { id, house, check_in } = order;
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, id);
    } catch (err) {
        console.log(err.message);

        const title = [house.title, getRooms(order), asDay(String(check_in))].join(' – ');

        chat = await pb.collection('chats').create({
            id,
            title,
            type: 4,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

export async function load({ parent, url, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    if (url.searchParams.get('type') !== '4') return {};

    const { order } = await parent();
    if (!order) return {};

    const chat = await loadChat(pb, order)
    if (!profile) return { chat };

    const talk = await loadTalk(pb, profile.id, chat.id);
    return { chat, talk }
}

const deleteOrder = async (pb, order) => {
    const actions = [];

    for (const room_id of order.room_ids) {
        try {
            let { check_in } = await pb.collection('room_checks').getFirstListItem(
                `room_id="${room_id}"&&check_out=${order.check_in}`, { sort: 'check_in' }
            );
            const id = addId(room_id, '0000000' + order.check_out);
            const { check_out } = await pb.collection('room_checks').getOne(id);

            while (check_in < order.check_out) {
                const id = addId(room_id, '0000000' + check_in);
                actions.push(pb.collection('room_checks').update(id, { check_out }));
                check_in = getDate(check_in + 1);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    await Promise.all(actions);
}

const restoreOrder = async (pb, order) => {
    const actions = [];

    for (const room_id of order.room_ids) {
        let { check_in } = await pb.collection('room_checks').getFirstListItem(
            `room_id="${room_id}"&&check_out>${order.check_in}`, { sort: 'check_in' }
        );
        while (check_in < order.check_out) {
            const id = addId(room_id, '0000000' + check_in);
            actions.push(pb.collection('room_checks').update(id, {
                check_out: Math.max(check_in, order.check_in)
            }));
            check_in = getDate(check_in + 1);
        }
    }
    await Promise.all(actions);
}

export const actions = {
    status: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const { id } = params;

        const data = await request.formData();
        const status = +data.get('status');

        const res = await pb.collection('orders').getOne(id);
        if (status !== res.status) {
            const order = await pb.collection('orders').update(id, { status });

            if (status === 2) deleteOrder(pb, order);
            if (res.status === 2) restoreOrder(pb, order);
        }
    }
}