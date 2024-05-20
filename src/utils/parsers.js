import { WORLD_CUP, NO_HOME_ADVANTAGE_COMPS } from '@utils/regex';
import { MATCH_STATUSES } from '@constants/data';

// The Irish team represents both Ireland and Northern Ireland, so if the venue country
// is Northern Ireland we still want it to count as home advantage.
function getVenueCountry(venue) {
  return venue?.country === 'Northern Ireland' ? 'Ireland' : venue?.country;
}

function parseMatch({ matchId, teams, scores, status, venue, time, competition }) {
  const noHomeAdvantage = NO_HOME_ADVANTAGE_COMPS.some(regex => Boolean(competition?.match(regex)));
  const venueCountry = getVenueCountry(venue);
  const indexOfVenueTeam = venue ? teams.map(t => t.country).indexOf(venueCountry) : 0;
  const isNeutralVenue = noHomeAdvantage ? true : indexOfVenueTeam < 0;
  const homeIndex = indexOfVenueTeam < 0 ? 0 : indexOfVenueTeam;
  const awayIndex = indexOfVenueTeam === 1 ? 0 : 1;

  const homeTeam = teams[homeIndex];
  const awayTeam = teams[awayIndex];
  const isComplete = status === MATCH_STATUSES.COMPLETE;
  const homeScore = isComplete ? scores[homeIndex] : null;
  const awayScore = isComplete ? scores[awayIndex] : null;
  const isWorldCup = WORLD_CUP.test(competition);

  return {
    matchId,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    venue,
    time,
    competition,
    isNeutralVenue,
    isWorldCup,
    isComplete,
  };
}

export function parseMatches(matches) {
  return matches.map(match => parseMatch(match));
}
