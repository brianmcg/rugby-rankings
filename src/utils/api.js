
import axios from 'axios';
import { formatApiDate, addWeeks, subtractWeeks } from '@utils/date';
import { parseMatchResponse } from '@utils/parsers';
import { RANKINGS, FIXTURES } from '@constants/urls';
import { VALUES } from '@constants/sports';

// This is for slowing down requests for development purposes.
// const sleep = t => new Promise(resolve => setTimeout(resolve, t));

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

async function fetchMatches(sport = VALUES.MENS, teams, startDate, endDate) {
  const startDatePrev = subtractWeeks(startDate, 1, 'week');
  const queryParams = {
    startDate: formatApiDate(startDatePrev),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  };

  const response = await axiosGet(FIXTURES, queryParams);

  return parseMatchResponse(response, teams);
}

export async function fetchData(sport) {
  try {
    const { entries: rankings, label, effective } = await fetchRankings(sport);
    const teams = rankings.map(entry => entry.team);
    const startDate = effective.millis;
    const endDate = addWeeks(effective.millis, 1).valueOf();
    const matches = await fetchMatches(sport, teams, startDate, endDate);

    return { sport, label, teams, rankings, matches, startDate, endDate };
  } catch (error) {
    return Promise.reject(error);
  }
}
