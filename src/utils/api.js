import axios from 'axios';

const MENS_RANKINGS_URL = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru';

const FIXTURES = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match'

async function fetchData(url, params) {
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchRankings = () => fetchData(MENS_RANKINGS_URL);

export const fetchFixtures = () => {
  const params = {
    startDate: '2024-04-29',
    endDate: '2024-05-06',
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport: 'mru',
  };

  return fetchData(FIXTURES, params);
}

