
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
    const { entries: rankings, label, effective } = await fetchRankings(sport);
    const teams = rankings.map(entry => entry.team);
    const startDate = effective.millis;
    const endDate = addWeeks(effective.millis, dateRange).valueOf();
    const matches = await fetchMatches(sport, startDate, endDate);

    const teamIds = matches.content.reduce((memo, match) => {
      match.teams.forEach(team => {
        if (!memo.includes(team.id)) {
          memo.push(team.id);
        }
      });
      return memo;
    }, []);

    const matchTeams = await fetchTeams(teamIds);

    const countriesByTeamId = matchTeams.reduce((memo, team) => {
      return {
        ...memo,
        [team.id]: team.country,
      };
    }, {});

    const teamsWithCountry = teams.map(team => ({
      ...team, country:
      countriesByTeamId[team.id],
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
