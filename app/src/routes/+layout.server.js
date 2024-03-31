
export async function load({ locals }) {
    const profile = locals.pb.authStore.model;

    return { profile };
}
