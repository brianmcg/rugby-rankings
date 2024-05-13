import axios from 'axios';
import { formatApiDate, addWeeks } from '@utils/date';
import { parseMatchResponse } from '@utils/parsers';
import { RANKINGS, FIXTURES } from '@constants/urls';
import { VALUES } from '@constants/sports';

// This is for slowing down requests for development purposes.
// const sleep = t => new Promise(resolve => setTimeout(resolve, t))

async function axiosGet(url, params) {
  try {
    // await sleep(1000);
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

function fetchRankings(sport = VALUES.MENS) {
  return axiosGet(`${RANKINGS}/${sport}`);
}

async function fetchMatches(sport = VALUES.MENS, teams, date) {
  // const startDate = subtractWeeks(date, 1, 'week');
  const endDate = addWeeks(date, 1);

  const queryParams = {
    startDate: formatApiDate(date),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  };

  const response = await axiosGet(FIXTURES, queryParams);

  return parseMatchResponse(response, teams);
}

export async function fetchData(id) {
  try {
    const { entries: rankings, label, effective } = await fetchRankings(id);
    const teams = rankings.map(entry => entry.team);
    const matches = await fetchMatches(id, teams, effective.millis);

    return { id, label, teams, rankings, matches, effective };
  } catch (error) {
    return Promise.reject(error);
  }
}
