import { addId } from '$lib';
import { default_params } from '$lib/data/house';

async function loadReacts(pb, profile) {
    const res = await pb.collection('house_reacts').getFullList({
        filter: `profile_id="${profile.id}"`
    });
    if (res.length) {
        const reacts = {};
        res.forEach(({ house_id, react }) => (reacts[house_id] = react));
        return reacts;
    }
}

async function loadHouses(pb, profile, params) {
    const { sort, category, status, manager_id } = params;

    const filters = [];

    if (status != null) filters.push(`status=${status}`);
    if (category != null) filters.push(`categories~'"${category}"'`);
    if (manager_id != null) filters.push(`manager_ids~'"${manager_id}"'`);

    const houses = await pb.collection('houses').getFullList({
        filter: filters.join('&&'),
        sort
    });

    if (profile) {
        const reacts = await loadReacts(pb, profile);
        if (reacts) houses.forEach(h => (h.react = reacts[h.id]));
        houses.forEach(h => h.photos = h.photos.map((p, i) => ({ id: i, url: pb.files.getUrl(h, p) })));
    }

    return houses;
}

export async function load({ locals, url }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const params = { ...default_params };
    for (const key of ['sort', 'category', 'manager_id']) {
        params[key] = url.searchParams.get(key) || params[key];
    }
    if (profile) {
        const status = url.searchParams.get('status');
        if (status != null && profile.role >= 2) params.status = +status;
    }
    return {
        houses: loadHouses(pb, profile, params),
        profile,
        params
    };
}

export const actions = {
    react: async ({ request, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();

        const house_id = data.get('house_id');
        const react = +data.get('react');

        const id = addId(profile.id, house_id);

        try {
            const res = await pb.collection('house_reacts').getOne(id);

            if (res.react === react) return;
            await pb.collection('house_reacts').update(id, { react });

            const data = {};
            if (res.react > 0) data[res.react + '-'] = 1;
            if (react > 0) data[react + '+'] = 1;

            await pb.collection('houses').update(house_id, data);

        } catch (err) {
            console.log(err.message);

            await pb.collection('houses').update(house_id, { [react + '+']: 1 });

            await pb.collection('house_reacts').create({
                id,
                react,
                profile_id: profile.id,
                house_id
            });
        }

    }
}