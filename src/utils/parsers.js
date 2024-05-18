const MATCH_STATUSES ={
  COMPLETE: 'C',
  UPCOMING: 'U',
};

const RWC_REGEX = /rugby world cup \w+/i;

// I need to check if home advantage applies in a competition.
// For example I've seen that home advantage didn't seem apply
// to the ranking calculations for the `Asia Rugby Championship 2024`.
// I see nothing in the api data that can tell me this.
// So I'm just going to keep a list `NO_HOME_ADVANTAGE_COMPS` here in the code.
// I'll update this list if I see this happening with other competitions.
const NO_HOME_ADVANTAGE_COMPS = [
  /asia rugby championship \w+/i,
];

function parseMatch({ matchId, teams, scores, status, venue, time, competition }) {
  const noHomeAdvantage = NO_HOME_ADVANTAGE_COMPS.some(regex => Boolean(competition?.match(regex)));
  const indexOfVenueTeam = teams.map(t => t.country).indexOf(venue?.country);
  const isNeutralVenue = noHomeAdvantage ? true : indexOfVenueTeam < 0;
  const homeIndex = indexOfVenueTeam < 0 ? 0 : indexOfVenueTeam;
  const awayIndex = indexOfVenueTeam === 1 ? 0 : 1;
  const homeTeam = teams[homeIndex];
  const awayTeam = teams[awayIndex];
  const isComplete = status === MATCH_STATUSES.COMPLETE;
  const homeScore = isComplete ? scores[homeIndex] : null;
  const awayScore = isComplete ? scores[awayIndex] : null;
  const isWorldCup = RWC_REGEX.test(competition);

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
