import dayjs from 'dayjs';

export const formatTime = date => dayjs(date).format('H:mm');

export const formatDay = date => dayjs(date).format('DD MMM YYYY');

export const formatDayMonth = date => dayjs(date).format('DD MMM');

export const formatRange = (startDate, endDate) => `${formatDayMonth(startDate)} - ${formatDayMonth(endDate)}`;

export const formatApiDate = date => dayjs(date).format('YYYY-MM-DD');

export const addDays = (date, amount) => dayjs(date).add(amount, 'day');

export const subtractDays = (date, amount) => dayjs(date).subtract(amount, 'day');

export const addWeeks = (date, amount) => dayjs(date).add(amount, 'week');

export const subtractWeeks = (date, amount) => dayjs(date).subtract(amount, 'week');

export const addMonths = (date, amount) => dayjs(date).add(amount, 'month');

export const subtractMonths = (date, amount) => dayjs(date).subtract(amount, 'month');

export const getPreviousMonday = (date) => {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0) {
    return subtractDays(date, 6).toDate();
  } else if (dayOfWeek === 1) {
    return date;
  } else {
    return subtractDays(date, dayOfWeek - 1).toDate();
  }
};
