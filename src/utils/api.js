import axios from 'axios';
import dayjs from 'dayjs';

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
  const startDate = dayjs(millis);
  const endDate = startDate.add(1, 'month');

  const params = {
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  };

  const { content } = await fetchData(FIXTURES, params);

  return content;
}

