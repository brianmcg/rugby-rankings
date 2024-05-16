
import axios from 'axios';
import { formatApiDate, addWeeks } from '@utils/date';
import { parseMatchResponse } from '@utils/parsers';
import { RANKINGS, FIXTURES, TEAMS } from '@constants/urls';
import { VALUES } from '@constants/sports';

// This is for slowing down requests for development purposes.
// const sleep = t => new Promise(resolve => setTimeout(resolve, t));

// This is for fetching old rankings for development purposes.
// const currentDate = subtractWeeks(new Date(), 2);

const currentDate = new Date();

const dateRange = 1;

async function axiosGet(url, params = {}) {
  try {
    // await sleep(1000);
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

function fetchRankings(sport = VALUES.MENS) {
  return axiosGet(`${RANKINGS}/${sport}`, {
    date: formatApiDate(currentDate),
  });
}

function fetchMatches(sport = VALUES.MENS, startDate, endDate) {
  return axiosGet(FIXTURES, {
    startDate: formatApiDate(startDate),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  });
}

export function fetchTeams(ids) {
  const requests = ids.map(id => axiosGet(`${TEAMS}/${id}`));

  return axios.all(requests);
}

export async function fetchData(sport) {
  try {
    // Fetch the rankings first.
    const { entries: rankings, label, effective } = await fetchRankings(sport);

    // Create a list of teams from countries in the rankings.
    // This will be used for the autocomplete team input, and also to exclude
    // matches that have teams that are not in the rankings.
    const teams = rankings.map(entry => entry.team);

    // Get thestart and end date for which to fetch matches.
    const startDate = effective.millis;
    const endDate = addWeeks(startDate, dateRange).valueOf();

    // Fetch the matches.
    const matches = await fetchMatches(sport, startDate, endDate);

    // Get id's of teams participating in matches in order to fetch
    // the country data required to determine home advantage.
    const teamIds = matches.content
      .reduce(
        (memo, match) => match.teams.reduce(
          (teamIds, team) => teamIds.includes(team.id) ? teamIds : [ ...teamIds, team.id ],
          memo,
        ),
        [],
      );

    // I need to fetch each team that has a match, to get the name of the country,
    // which can be different from the name of team. I need the name of the country
    // later to compare with the venue country to to determine home advantage.
    const matchTeams = await fetchTeams(teamIds);

    // Create a map with team ids as the key and country as the value.
    const countriesByTeamId = matchTeams.reduce((memo, team) => ({
      ...memo,
      [team.id]: team.country,
    }), {});

    // Create a list of teams with name of the country injected
    // for teams that have matches in the range.
    const teamsWithCountry = teams.map(team => ({
      ...team,
      country: countriesByTeamId[team.id],
    }));

    return {
      sport,
      label,
      teams: teamsWithCountry,
      rankings,
      matches: parseMatchResponse(matches, teamsWithCountry),
      startDate,
      endDate,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
