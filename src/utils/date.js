import dayjs from 'dayjs';

export const format = date => dayjs(date).format('DD MMM YYYY');

export const formatTime = date => dayjs(date).format('H:mm');

export const formatDay = date => dayjs(date).format('DD MMM YYYY');

export const formatApiDate = date => dayjs(date).format('YYYY-MM-DD');

export const addWeeks = (date, amount) => dayjs(date).add(amount, 'week');

export const subtractWeeks = (date, amount) => dayjs(date).subtract(amount, 'week');

export const addMonths = (date, amount) => dayjs(date).add(amount, 'month');

export const subtractMonths = (date, amount) => dayjs(date).subtract(amount, 'month');
