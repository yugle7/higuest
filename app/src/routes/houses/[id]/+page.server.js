import { addId } from "$lib";
import { createChat, getInviteLink } from "$lib/data/vk";

async function loadReacts(pb, talk_id) {
    const res = await pb.collection('reacts').getFullList({
        filter: `talk_id="${talk_id}"`
    });
    const reacts = {};
    res.forEach(({ message_id, react }) => (reacts[message_id] = react));
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

async function loadChat(pb, house) {
    const { id, title } = house;
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, id);
    } catch (err) {
        console.log(err.message);

        chat = await pb.collection('chats').create({
            id,
            title,
            type: 2,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

export async function load({ parent, url, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    if (url.searchParams.get('type') !== '2') return {};

    const { house } = await parent();
    if (!house) return {};

    const chat = await loadChat(pb, house)
    if (!profile) return { chat };

    const talk = await loadTalk(pb, profile.id, chat.id);
    return { chat, talk }
}


const editRoom = async (pb, photos, room, house_id) => {
    const { id, photo_ids } = room;
    delete room.id;
    delete room.photo_ids;

    if (photos.length) {
        room.photos = photos;
    } else {
        delete room.photos;
    }
    room.house_id = house_id;

    let res;
    if (id) {
        res = await pb.collection('rooms').update(id, room);
    } else {
        res = await pb.collection('rooms').create(room);
    }
    if (photo_ids.length !== res.photos.length || photo_ids.some((id, i) => id != i)) {
        await pb.collection('rooms').update(id, { photos: photo_ids.map(id => res.photos[id]) });
    }
};

const editHouse = async (pb, photo_ids, id, house) => {
    const { photos } = await pb.collection('houses').update(id, house);
    if (photo_ids.length !== photos.length || photo_ids.some((id, i) => id != i)) {
        await pb.collection('houses').update(id, { photos: photo_ids.map(id => photos[id]) });
    }
}

export const actions = {
    edit: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        console.log('data', data);
        const { id } = params;

        const categories = data.getAll('categories');
        if (categories.length === 0) return;

        const contacts = data.get('contacts');

        const rooms = JSON.parse(data.get('rooms'));
        const photo_ids = JSON.parse(data.get('photo_ids'));

        const house = {
            title: data.get('title'),
            about: data.get('about'),
            photos: data.getAll('+'),
            price: JSON.parse(data.get('price')),
            city: data.get('city'),
            street: data.get('street'),
            building: data.get('building'),
            cars: +data.get('cars'),
            categories,
            rooms: rooms.length,
            changed: new Date()
        };

        if (contacts) {
            house.contacts = contacts.split();

            if (contacts.includes('vk')) {
                const { chat_id } = await createChat(house.title);
                const { link } = await getInviteLink(chat_id);

                house.vk = [chat_id, link];
            }
        }
        await Promise.all([
            editHouse(pb, photo_ids, id, house),
            ...rooms.map((r, i) => editRoom(pb, data.getAll(i + '+'), r, id))
        ]);

        return { success: true };
    },
    status: async ({ request, params, locals }) => {
        const pb = locals.pb;

        const data = await request.formData();
        const status = +data.get('status');

        await pb.collection('houses').update(params.id, { status });
    }
}