export const default_params = {
    sort: '-updated',
    wanted: false,
    friend: false
};

export const user_role = [
    'Новичок',
    'Участник',
    'Модератор',
    'Админ',
    'Создатель'
];

export const user_sort = {
    '-updated': 'Активные',
    '-created': 'Новые',
};

export const auth_provider = {
    'yandex': 'Яндекс',
    'google': 'Google'
};

export function getAuthor(user) {
    const { username, fullname } = user;
    return { username, fullname };
}

export function checkPassword(password) {
    if (password !== '' && password.length < 8) {
        return 'должно быть не меньше 8 символов';
    }
}

export function checkEmail(email) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    return 'некорректная почта';
}

export function checkLogin(login) {
    return login.includes('@') ? checkEmail(login) : checkUsername(login);
}

export function checkUsername(username) {
    if (username === '') return;

    if (username.length < 3) {
        return 'должно быть более 2 символов';
    }
    if (username.length > 15) {
        return 'должно быть не более 15 символов';
    }
    if (/[A-Z]/.test(username)) {
        return 'не должно быть заглавных букв'
    }
    if (/[^a-z0-9_]/.test(username)) {
        return 'разрешена только латиница, цифры и _'
    }
}

export function checkFullname(fullname) {
    if (fullname.length < 1) {
        return 'должно быть более 1 символа';
    }
    if (fullname.length > 25) {
        return 'должно быть не более 25 символов';
    }
    if (/[0-9]$/.test(fullname)) {
        return 'не должно быть цифр'
    }
    if (/[^a-zA-Zа-яА-ЯёЁ '-]/.test(fullname)) {
        return 'недопустимый символ'
    }
}

export function normFullname(fullname) {
    fullname = fullname.toLowerCase();
    fullname = fullname.replace('ё', 'е');
    let names = fullname.split(/[^a-zа-я]/);
    names = names.filter(name => name !== '');
    names = names.map(name => name[0].toUpperCase() + name.slice(1));
    return names.join(' ');
}


export function checkContacts(contacts) {
    contacts = contacts.split(/[,\s]+/);
    for (let c of contacts) {
        if (!normContact(c)) return 'не получилось распарсить ' + c;
    }

}

export function normContacts(contacts) {
    contacts = contacts.split(/[,\s]+/);
    return contacts.map(normContact).join('\n');
}

export const hosts = {
    vk: 'vk.com',
    fb: 'fb.com',
    tg: 't.me',
    ok: 'ok.ru',
    github: 'github.com',
    gitlab: 'gitlab.com',
    linkedin: 'www.linkedin.com',
    pinterest: 'pinterest.com',
    youtube: 'www.youtube.com'
};

const domains = {
    vkontakte: 'vk',
    facebook: 'fb',
    telegram: 'tg',
    t: 'tg',
    odnoklassniki: 'ok'
};

export function normContact(contact) {
    const i = contact.lastIndexOf("/");

    const id = contact.substring(i + 1, contact.length);
    if (id.includes('?')) return;

    if (i <= 0) return `vk/${id}`;
    
    const host = contact.substring(0, i).replace(/(https?:\/\/)?(www\.)?/, '');
    const j = host.lastIndexOf(".");

    const domain = j >= 0 ? host.substring(0, j) : host;
    domain = domains[domain] || domain;

    if (hosts[domain]) domain + '/' + id;
}
