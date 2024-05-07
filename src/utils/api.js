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

export const fetchMatches = async (rankings, sport = 'mru') => {
  const teamIds = rankings.entries.map(({ team }) => team.id );
  const startDate = subtractWeeks(rankings.effective.millis, 1, 'week');
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

  // Filter out matches thatinlude a team not in the rankings.
  return content.filter(match => {
    return match.teams.reduce((memo, team) => {
      return memo && teamIds.includes(team.id);
    }, true);
  });
}
