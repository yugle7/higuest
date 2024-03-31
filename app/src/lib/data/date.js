import { toIntDate, getWeekday } from '$lib/data/time';

export const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export const getNow = () => {
    const date = new Date();
    return toIntDate(date.getFullYear(), date.getMonth(), date.getDate());
};

const getDays = (year, month) => {
    month++;
    if (month === 12) {
        year++;
        month = 0;
    }
    return new Date(year, month, 0).getDate();
};

const getDates = (year, month) => {
    const dates = new Array(getWeekday(year, month, 1)).fill({});

    for (let day = 1; day <= getDays(year, month); day++) {
        const today = toIntDate(year, month, day);
        dates.push({ day, today });
    }
    return dates;
};

export const getCalendar = (now) => {
    let year = Math.floor(now / 10000);
    let month = Math.floor(now / 100) % 100 - 1;

    const calendar = [];
    for (let i = 0; i < 3; i++) {
        calendar.push({
            year: !month && year,
            month: months[month],
            dates: getDates(year, month)
        });
        month++;
        if (month === 12) {
            year++;
            month = 0;
        }
    }
    return calendar;
};
