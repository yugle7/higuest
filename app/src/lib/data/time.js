
export const toIntDate = (year, month, day) => 10000 * year + 100 * (month + 1) + day;
export const toStrDate = (time) => time.substring(8, 10) + '.' + time.substring(5, 7) + '.' + time.substring(2, 4);

const intToDate = (date) => {
    const year = Math.floor(date / 10000);
    const month = (Math.floor(date / 100) % 100) - 1;
    const day = date % 100;
    return new Date(year, month, day);
}

export const getDays = (start, finish) => Math.ceil((intToDate(finish) - intToDate(start)) / 86400000);
export const getWeekday = (year, month, day) => (new Date(year, month, day).getDay() + 6) % 7;

export const getDate = (date) => {
    const day = date % 100;
    if (day > 0 && day <= 28) return date;
    const year = Math.floor(date / 10000);
    const month = Math.floor(date / 100) % 100;
    date = new Date(year, month - 1, day);
    return toIntDate(date.getFullYear(), date.getMonth(), date.getDate());
}

const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

export const asDay = (time) => +time.substring(6, 8) + ' ' + months[time.substring(4, 6) - 1];
