import { VK_TOKEN, VK_VERSION, VK_URL } from '$env/static/private'


export const createChat = async (title) => {
    const res = await fetch(`${VK_URL}/messages.createChat?title=${title}&v=${VK_VERSION}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${VK_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    const { response } = await res.json();
    return response;
}

export const getInviteLink = async (chat_id) => {
    const peer_id = 2000000000 + chat_id;

    const res = await fetch(`${VK_URL}/messages.getInviteLink?peer_id=${peer_id}&v=${VK_VERSION}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${VK_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    const { response } = await res.json();
    return response;
};
