import axios from 'axios';

const MENS_RANKINGS_URL = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru';

async function fetchData(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchRankings = () => fetchData(MENS_RANKINGS_URL);
