
import axios from 'axios';
import { formatApiDate, addWeeks, subtractWeeks } from '@utils/date';
import { parseMatches } from '@utils/parsers';
import { RANKINGS, FIXTURES, TEAMS } from '@constants/urls';
import { VALUES } from '@constants/sports';

const DEV_MODE = false;

const DELAY_API_REQUESTS = false;

const DATE_RANGE = DEV_MODE ? 3 : 1;

const CURRENT_DATE = DEV_MODE ? subtractWeeks(new Date(), 2) : new Date();

const sleep = millis => new Promise(resolve => setTimeout(resolve, millis));

async function axiosGet(url, params = {}) {
  try {
    if (DELAY_API_REQUESTS) await sleep(1000);
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchCountries(teamIds) {
  const requests = teamIds.map(id => axiosGet(`${TEAMS}/${id}`));
  const teams = await axios.all(requests);

  return teams.reduce((memo, team) => ({ ...memo, [team.id]: team.country }), {});
}

function fetchRankings(sport = VALUES.MENS) {
  return axiosGet(`${RANKINGS}/${sport}`, {
    date: formatApiDate(CURRENT_DATE),
  });
}

async function fetchMatches(sport = VALUES.MENS, startDate, endDate, rankings) {
  const rankedTeamIds = rankings.map(entry => entry.team.id);

  const response = await axiosGet(FIXTURES, {
    startDate: formatApiDate(startDate),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  });

  // filter out matches with undefined or null teams or that feature teams that are not in the rankings.
  const matches = response.content.filter(match => {
    const isTeamsConfirmed = match.teams.every(team => Boolean(team));
    const isTeamsRanked = match.teams.every(team => rankedTeamIds.includes(team.id));

    return isTeamsConfirmed && isTeamsRanked;
  });

  // For each match I need to fetch the country for each participating team.
  // The name of thecountry can be different from the name of team.
  // I need the name of the country later to compare with the venue country to to determine home advantage.
  return Promise.all(matches.map(async match => {
    const matchTeamIds = match.teams.map(team => team.id);
    const countries = await fetchCountries(matchTeamIds);

    return {
      ...match,
      teams: match.teams.map(team => ({ ...team, country: countries[team.id] })),
    };
  }));
}

export async function fetchData(sport) {
  try {
    const { entries: rankings, label, effective } = await fetchRankings(sport);

    const startDate = effective.millis;
    const endDate = addWeeks(startDate, DATE_RANGE);

    const matches = await fetchMatches(sport, startDate, endDate, rankings);

    // Make a map of teams participating in matches grouped by team id to be used below.
    const matchTeamsById = matches.reduce(
      (outerMemo, match) => (match.teams.reduce(
        (innerMemo, team) => ({ ...innerMemo, [team.id]: team }),
        outerMemo)
      ),
      {},
    );

    // Create a list of teams from the fetched rankings, with the the teams participating in matches injected,
    // since they have the country attribute missing from the teams fetched from the rankings.
    const teams = rankings.map(({ team }) => matchTeamsById[team.id] ?? team, []);

    return {
      sport,
      label,
      teams,
      rankings,
      matches: parseMatches(matches),
      startDate,
      endDate,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
