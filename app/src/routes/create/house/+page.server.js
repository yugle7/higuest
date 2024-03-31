
import { redirect } from "@sveltejs/kit";
import { getAuthor } from "$lib/data/user";
import { getCount } from "$lib/data/house";
import { createChat, getInviteLink } from "$lib/data/vk";

const getPhotos = (room, photos) => room.photos.map(id => photos[id]);

export const actions = {
    default: async ({ request, locals }) => {
        const pb = locals.pb;

        const profile = pb.authStore.model;
        if (!profile) throw redirect(303, '/login');

        const data = await request.formData();
        const rooms = JSON.parse(data.get('rooms'));

        console.log(data);
        console.log(rooms);

        const contacts = data.get('contacts');
        const photos = data.getAll('+');

        const house = {
            owner_id: [profile.id],
            owner: getAuthor(profile),
            manager_ids: [profile.id],
            title: data.get('title'),
            photos: JSON.parse(data.get('photos')).map(id => photos[id]),
            about: data.get('about'),
            city: data.get('city'),
            street: data.get('street'),
            building: data.get('building'),
            categories: data.getAll('categories'),
            rooms: rooms.length,
            cars: +data.get('cars'),
            adults: getCount(rooms, 'adults'),
            children: getCount(rooms, 'children'),
            kids: getCount(rooms, 'kids'),
            price: JSON.parse(data.get('price')),
            phone: data.get('phone'),
            changed: new Date(),
        }

        if (contacts) {
            house.contacts = contacts.split();

            if (contacts.includes('vk')) {
                const { chat_id } = await createChat(house.title);
                const { link } = await getInviteLink(chat_id);

                house.vk = [chat_id, link];
            }
        }

        const { id, city, street, building, title } = await pb.collection('houses').create(house);
        await pb.collection('users').update(profile.id, { 'houses+': 1 })

        await Promise.all(rooms.map((r, i) => pb.collection('rooms').create({
            ...r,
            photos: getPhotos(r, data.getAll(i + '+')),
            house_id: id,
            house: { city, street, building, title }
        })));

        redirect(303, `/houses/${id}`);
    }
}