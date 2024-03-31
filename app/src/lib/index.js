import PocketBase from 'pocketbase'
import { writable } from "svelte/store";

import { PUBLIC_PB_URL } from '$env/static/public'

export const plus = String.fromCharCode(65291);

export const screen = writable(null);
export const loaded = writable(null);

export const edited = writable({});
export const search = writable('');
export const create = writable(false);

export const state = writable({});
export const error = writable({});

export const back = writable('');

export const pb = new PocketBase(PUBLIC_PB_URL);
// pb.autoCancellation(false);

export const getUserId = () => Date.now().toString().slice(4) + Math.random().toString(36).slice(2);

const getCode = (s, i) => {
    const n = s.charCodeAt(i);
    return n < 58 ? n - 48 : n - 87;
};

const getChar = (n) => {
    if (n >= 36) {
        n -= 36;
    }
    return String.fromCharCode(n < 10 ? n + 48 : n + 87);
}

export const subId = (a, b) => {
    let s = '';
    for (let i = 0; i < 15; i++) {
        s += getChar(36 + getCode(a, i) - getCode(b, i));
    }
    return s;
}

export const addId = (a, b) => {
    let s = '';
    for (let i = 0; i < 15; i++) {
        s += getChar(getCode(a, i) + getCode(b, i));
    }
    return s;
}
