import dayjs from 'dayjs';

export const format = date => dayjs(date).format('DD MMM YYYY');

export const formatTime = date => dayjs(date).format('hh:mm');

export const formatDay = date => dayjs(date).format('DD MMM YYYY');

export const formatApiDate = date => dayjs(date).format('YYYY-MM-DD');

export const addMonths = (date, amount) => dayjs(date).add(amount, 'month');

export const subtractWeeks = (date, amount) => dayjs(date).subtract(amount, 'week');
