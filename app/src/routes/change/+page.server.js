import { fail, redirect } from "@sveltejs/kit";
import { getAuthor } from "$lib/data/user";

export async function load({ locals }) {
    const profile = locals.pb.authStore.model;
    if (!profile) throw redirect('/login');

    return { profile };
}

const changeTalks = async (pb, profile) => {
    const res = await pb.collection('talks').getFullList({ filter: `user_id="${profile.id}"` });
    await Promise.all(res.map(({ id }) => pb.collection('talks').update(id, { user: getAuthor(profile) })));
}

const changeMessages = async (pb, profile) => {
    const res = await pb.collection('messages').getFullList({ filter: `author_id="${profile.id}"` });
    await Promise.all(res.map(({ id }) => pb.collection('messages').update(id, { author: getAuthor(profile) })));
}

const changeDiscussions = async (pb, profile) => {
    if (profile.discussions) {
        const res = await pb.collection('discussions').getFullList({ filter: `author_id="${profile.id}"` });
        await Promise.all(res.map(({ id }) => pb.collection('discussions').update(id, { author: getAuthor(profile) })));
    }
}

const changeHouses = async (pb, profile) => {
    if (profile.houses) {
        const res = await pb.collection('houses').getFullList({ filter: `owner_id="${profile.id}"` });
        await Promise.all(res.map(({ id }) => pb.collection('houses').update(id, { owner: getAuthor(profile) })));
    }
}

const changeOrders = async (pb, profile) => {
    if (profile.orders) {
        const res = await pb.collection('orders').getFullList({ filter: `client_id="${profile.id}"` });
        await Promise.all(res.map(({ id }) => pb.collection('orders').update(id, { client: getAuthor(profile) })));
    }
}

export const actions = {
    default: async ({ request, locals }) => {
        const pb = locals.pb;

        const profile = pb.authStore.model;
        if (!profile) throw redirect(303, '/login');

        const data = await request.formData();
        const username = data.get('username') || profile.username;

        if (username !== profile.username) {
            try {
                await pb.collection('users').getFirstListItem(`username="${username}"`);
                return fail(409, { error: { username: 'уже есть пользователь с таким логином' } });
            } catch (err) {
                console.log(err.message);
            }
        }
        const fullname = data.get('fullname') || null;
        const contacts = data.get('contacts')?.split('\n');
        const phone = data.get('phone');

        const valid = username === profile.username;

        if (
            !valid || fullname !== profile.fullname || phone !== profile.phone ||
            JSON.stringify(contacts) !== JSON.stringify(profile.contacts)
        ) {
            await pb.collection('users').update(profile.id, {
                username,
                fullname,
                phone,
                contacts,
                valid: profile.valid && valid
            });
        }

        if (!valid) {
            profile.username = username;

            await Promise.all([
                changeMessages(pb, profile),
                changeDiscussions(pb, profile),
                changeHouses(pb, profile),
                changeOrders(pb, profile)
            ]);
        }

        redirect(303, `/users/${username}`);
    }
}