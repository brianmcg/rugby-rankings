import axios from 'axios';
import { formatApiDate, addWeeks } from '@utils/date';
import { parseMatchResponse } from '@utils/parsers';

const MENS_RANKINGS_URL = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings';
const FIXTURES = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match';


async function fetchData(url, params) {
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchRankings = (sport = 'mru') => fetchData(`${MENS_RANKINGS_URL}/${sport}`);

export const fetchMatches = async (sport = 'mru', rankings) => {
  // const startDate = subtractWeeks(rankings.effective.millis, 1, 'week');
  const endDate = addWeeks(rankings.effective.millis, 1);

  const queryParams = {
    startDate: formatApiDate(rankings.effective.millis),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  };

  const response = await fetchData(FIXTURES, queryParams);

  return parseMatchResponse(response, rankings);
};
