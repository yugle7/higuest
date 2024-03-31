import { default_params } from '$lib/data/user';

async function getFriends(pb, profile) {
    if (!profile) return [];

    const res = await pb.collection('friends').getFullList({
        filter: `profile_id="${profile.id}"`
    });
    const friends = res.map((f) => f.user_id);
    return friends;
}

function getUser(user, friends) {
    const { id, username, position, rating, role } = user;
    return { id, username, position, rating, role, friend: friends.has(id) }
}

async function loadUsers(pb, profile, params) {
    const { role, position, wanted, friend } = params;
    if (wanted && role >= profile.role) return [];

    let { sort } = params;

    const filters = [];
    const friends = new Set(await getFriends(pb, profile));

    if (friend) {
        filters.push('(' + [...friends, profile.id].map(f => `id="${f}"`).join('||') + ')');
    }
    if (wanted) {
        filters.push('wanted!=null');
        sort = sort.replace('created', 'wanted');
    }
    if (role != null) {
        filters.push(`role=${role}`);
    } else if (wanted) {
        filters.push('role<' + profile.role);
    }
    if (position != null) filters.push(`position=${position}`)

    const res = await pb.collection('users').getList(1, 1000, {
        filter: filters.join('&&'),
        sort
    });
    return res.items.map(u => getUser(u, friends));
}

export async function load({ url, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const params = { ...default_params };
    for (const key of ['sort', 'role', 'position']) {
        params[key] = url.searchParams.get(key) || params[key];
    }

    if (profile) {
        for (const key of ['friend', 'wanted']) {
            if (url.searchParams.get(key)) params[key] = +url.searchParams.get(key);
        }
        params.wanted = profile.role >= 2 && params.wanted;
    }

    const users = loadUsers(pb, profile, params);

    return {
        users,
        profile,
        params
    };
}
