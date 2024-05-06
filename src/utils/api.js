import axios from 'axios';
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

  const queryParams = {
    startDate: formatApiDate(startDate),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  };

  const { content } = await fetchData(FIXTURES, queryParams);

  return content;
}
