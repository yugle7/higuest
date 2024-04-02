import { redirect } from '@sveltejs/kit';
import { default_params } from '$lib/data/offer';
import { getDays } from '$lib/data/time';
import { getPrice } from '$lib/data/price';
import { setPhotos } from '$lib/data/photo';

const getHouses = async (pb) => {
    try {
        const res = await pb.collection('houses').getFullList();
        res.forEach(setPhotos(pb));
        return res;

    } catch (err) {
        console.log(err.message);
        return [];
    }
}

const getRooms = async (pb, house_id) => {
    try {
        const res = await pb.collection('rooms').getFullList({ filter: `house_id="${house_id}"` });
        res.forEach(setPhotos(pb));
        return res;

    } catch (err) {
        console.log(err.message);
        return [];
    }
}

const getOffers = async (pb, params) => {
    const { house_id, check_in, check_out } = params;

    params.days = getDays(check_in, check_out);

    const filters = [`date>=${check_in}`, `date<${check_out}`];
    if (house_id) filters.push(`house_id="${house_id}"`);
    const res = await pb.collection('checks').getFullList({ filter: filters.join('&&') });
    const room_ids = new Set(res.map(({ room_id }) => room_id));

    const filter = [...room_ids].map(({ room_id }) => `id!="${room_id}"`).join('&&');
    const rooms = await pb.collection('rooms').getFullList({ filter });
    const houses = {};

    rooms.forEach((r) => {
        const { house, house_id, price } = r;

        house.id = house_id;
        r.price = getPrice(check_in, check_out, price);
    });
    rooms.forEach(({ house, house_id }) => houses[house_id] = { house, rooms: [] });
    rooms.forEach((r) => {
        const { house_id } = r;
        delete r.house;
        delete r.house_id;

        houses[house_id].rooms.push(r);
    });
    rooms.forEach(setPhotos(pb));
    console.log(houses);

    const offers = [];
    for (const { house, rooms } of Object.values(houses)) {
        setOffers(params, house, rooms, offers);
    }
    return offers;
}

const setOffers = (params, house, rooms, offers) => {
    const { adults, children, kids, days } = params;

    const o = [];
    for (const r of rooms) {
        if (r.adults >= adults && r.children >= children && r.kids >= kids) {
            offers.push({
                adults: r.adults,
                children: r.children,
                kids: r.kids,
                price: r.price,
                like: r.like,
                house,
                rooms: [r],
                days
            });
        } else {
            const n = o.length;
            for (let i = 0; i < n; i++) {
                const offer = { ...o[i] };

                offer.adults += r.adults;
                offer.children += r.children;
                offer.kids += r.kids;
                offer.price += r.price;
                offer.like = Math.min(r.like, offer.like);
                offer.rooms.push(r);

                if (offer.adults >= adults && offer.children >= children && offer.kids >= kids) {
                    offers.push(offer);
                } else {
                    o.push(offer);
                }
            }
            o.push({
                adults: r.adults,
                children: r.children,
                kids: r.kids,
                price: r.price,
                like: r.like,
                house,
                rooms: [r],
                days
            });
        }
    }
}

const loadOffers = async (pb, params) => {
    const { house_id, check_out } = params;

    if (check_out) return await getOffers(pb, params);
    return house_id ? await getRooms(pb, house_id) : await getHouses(pb);
}


export async function load({ locals, url }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const params = { ...default_params };
    for (const key of ['sort', 'category', 'adults', 'children', 'kids', 'cars', 'check_in', 'check_out', 'house_id']) {
        const value = url.searchParams.get(key);
        if (value) params[key] = value;
    }
    for (const key of ['adults', 'children', 'kids', 'cars', 'check_in', 'check_out']) params[key] = +params[key];

    return {
        offers: loadOffers(pb, params),
        profile,
        params
    };
}
