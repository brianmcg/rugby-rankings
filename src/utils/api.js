import axios from 'axios';
// import dayjs from 'dayjs';
import { formatApiDate, addMonths, subtractWeeks } from '@utils/date';




const MENS_RANKINGS_URL = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings';

const FIXTURES = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match'

async function fetchData(url, params) {
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchRankings = (sport = 'mru') => fetchData(`${MENS_RANKINGS_URL}/${sport}`);

export const fetchMatches = async (millis, sport = 'mru') => {
  const startDate = subtractWeeks(millis, 1, 'week');
  const endDate = addMonths(startDate, 1, 'month');

  const params = {
    startDate: formatApiDate(startDate),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  };

  const { content } = await fetchData(FIXTURES, params);

  return content;
}

// https://api.wr-rims-prod.pulselive.com/rugby/v3/match?startDate=2024-05-06&endDate=2024-06-06&sort=asc&pageSize=100&page=0&sport=mru
// https://api.wr-rims-prod.pulselive.com/rugby/v3/match?startDate=2024-05-06&endDate=2024-05-06&sort=asc&pageSize=100&page=0&sport=mru