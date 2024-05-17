const hasNoHomeAdvantage = [
  /Asia Rugby Championship \w+/gm,
];

function parseMatch(match ,teams) {
  const {
    venue,
    teams: matchTeams = [],
    scores = [],
    status,
    matchId,
    time,
    competition,
  } = match;

  // Check if home advantage applies in this competition.
  // I see nothing in the api data that can tell me this.
  // So I'm just going to keep a list `hasNoHomeAdvantage` here in the code and update
  // it whenever I see results where home advantage didn't apply. For example I've seen that
  // home advantage didn't seem apply to the ranking calculations for the `Asia Rugby Championship 2024`.
  const noHomeAdvantage = hasNoHomeAdvantage.some(regex => Boolean(competition?.match(regex)));

  // I want to use the teams from the `teams` array rather than the match data since
  // they contain the country name of the team, which can be different from the
  // `name` of the team. Eg. for Moldova the team name is `Moldova` but the country
  // name is `Moldova, Republic of`. I compare this country name with the venue country below to
  // determine which team has home advantage.
  const participants = matchTeams.map(m => teams.find(t => t.id === m?.id) || null);

  // Determine the index of the team with home advantage.
  const indexOfVenueTeam = participants.map(t => t.country).indexOf(venue?.country);
  const isNeutralVenue = noHomeAdvantage ? true : indexOfVenueTeam < 0;
  const homeIndex = indexOfVenueTeam < 0 ? 0 : indexOfVenueTeam;
  const awayIndex = indexOfVenueTeam === 1 ? 0 : 1;

  const homeTeam = teams.find(team => team.id === participants[homeIndex]?.id) || null;
  const awayTeam = teams.find(team => team.id === participants[awayIndex]?.id) || null;

  const isComplete = status === 'C';
  const homeScore = isComplete ? scores[homeIndex] : null;
  const awayScore = isComplete ? scores[awayIndex] : null;
  const isWorldCup = /Rugby World Cup \w+/gm.test(competition);

  return {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isNeutralVenue,
    isWorldCup,
    isComplete,
    venue,
    matchId,
    time,
    competition,
    isCreated: false,
  };
}

export function parseMatches(matches, teams) {
  const teamIds = teams.map(team => team.id);

  return matches.content.reduce((memo, match) => {
    // Are both teams in the match present in the list of ranked teams.
    const isTeamsRanked = match.teams.reduce((memo, team) => memo && teamIds.includes(team.id), true);
    // Are both teams in teh match defined.
    const isTeamsConfirmed = match.teams.reduce((memo, team) => memo && Boolean(team), true);

    if (isTeamsRanked && isTeamsConfirmed) {
      return [...memo, parseMatch(match, teams)];
    }

    return memo;
  }, []);
}
