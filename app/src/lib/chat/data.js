import { writable } from "svelte/store";

export const show = writable(null);
export const look = writable(null);
export const down = writable(null);
export const find = writable(null);
export const edit = writable(null);
export const menu = writable(null);

export const scroll = writable(null);
export const select = writable(null);

export const reply = writable(null);

export const message_react = [1, 2, 3, 4, 5, 6];

export const react_color = {
    'like': 'green',
    'dislike': 'red',
    'smile': 'yellow',
    'sad': 'blue',
    'love': 'pink',
    'serious': 'brown',
};

export const chat_type = [
    'Пользователь',
    'Общение',
    'Дом',
    'Номер',
    'Заказ'
];

export const default_params = {};

export const getTitle = (chat, talk) => chat.type === 0 ? talk.user.username : chat.title;

export const getUrl = (chat) => {
    const { type, talk } = chat;
    let url;

    if (type === 0) url = `/users/${talk.user.username}`;
    else if (type === 1) url = `/discussions/${chat.id}`;
    else if (type === 2) url = `/houses/${chat.id}`
    else if (type === 3) url = `/rooms/${chat.id}`
    else if (type === 4) url = `/orders/${chat.id}`

    return `${url}?type=${type}`
}

export const getReply = (message) => {
    const { id, author_id, author, text } = message;
    return { id, author_id, author, text };
}
