import { fail } from "@sveltejs/kit";

import { PASSWORD } from '$env/static/private';
import crypto from 'crypto';

export const actions = {
    default: async ({ request, locals }) => {
        const pb = locals.pb;

        const data = await request.formData();
        console.log(data);

        const user_id = data.get('user_id');
        const email = data.get('email');
        const phone = data.get('phone');
        const contacts = data.get('contacts') ? data.get('contacts').split() : null;

        const hash = crypto.createHash('sha256')
        hash.update(data.get('password'))
        hash.update(PASSWORD)
        const password = hash.digest('hex')

        const username = data.get('username');
        const fullname = data.get('fullname');

        try {
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                username,
                fullname,
                phone,
                contacts
            });
        } catch (err) {
            return fail(401, { error: err.message });
        }
        try {
            const { record } = await pb.collection('users').authWithPassword(email, password);
            console.log(record);

            const res = await pb.collection('orders').getFullList({ filter: `phone="${phone}"&&client_id=null` });
            await Promise.all(res.map(({ id }) => pb.collection('orders').update(id, { client_id: record.id })));

            // const res = await pb.collection('users').requestVerification(email);
            if (!res) {
                return fail(401, { error: 'не получилось отправить письмо' });
            }
            return { profile: pb.authStore.model }

        } catch (err) {
            return fail(401, { error: err.message });
        }
    }
}
