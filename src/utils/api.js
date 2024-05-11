import axios from 'axios';
import { formatApiDate, addWeeks } from '@utils/date';
import { parseMatchResponse } from '@utils/parsers';
import { RANKINGS, FIXTURES } from '@constants/urls';
import { MENS } from '@constants/sports';

// This is for slowing down requests for development purposes.
// const sleep = t => new Promise(resolve => setTimeout(resolve, t))

async function fetchData(url, params) {
  try {
    // await sleep(1500);
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchRankings = (sport = MENS) => fetchData(`${RANKINGS}/${sport}`);

export const fetchMatches = async (sport = MENS, rankings) => {
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
