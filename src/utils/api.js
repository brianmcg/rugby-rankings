import axios from 'axios';
import { formatApiDate, addWeeks } from '@utils/date';
import { parseMatchResponse } from '@utils/parsers';
import { RANKINGS, FIXTURES } from '@constants/urls';
import { MENS } from '@constants/sports';

// This is for slowing down requests for development purposes.
// const sleep = t => new Promise(resolve => setTimeout(resolve, t))

async function axiosGet(url, params) {
  try {
    // await sleep(1000);
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error)
  }
}

function fetchRankings(sport = MENS) {
  return axiosGet(`${RANKINGS}/${sport}`);
}

async function fetchMatches(sport = MENS, rankings) {
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

  const response = await axiosGet(FIXTURES, queryParams);

  return parseMatchResponse(response, rankings);
}

export async function fetchData(sport) {
  try {
    const rankings = await fetchRankings(sport);
    const matches = await fetchMatches(sport, rankings);
    return { rankings: { ...rankings, sport }, matches };
  } catch (error) {
    return Promise.reject(error)
  }
}
