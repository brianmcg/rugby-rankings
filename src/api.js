import axios from 'axios';

// const foo = 'https://cmsapi.pulselive.com/rugby/rankings/mru?date=2021-01-06&client=pulse';

const MENS_RANKINGS = 'https://cmsapi.pulselive.com/rugby/rankings/mru?language=en';

async function get(url) {

}

async function fetchMensRankings() {
  try {
    const { data } = await axios.get(MENS_RANKINGS);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch rankings');
  }
}

export { fetchMensRankings };