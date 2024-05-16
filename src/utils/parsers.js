const hasCompHomeAdvantage =[
  /Asia Rugby Championship \w+/gm,
];

export function parseMatchResponse(response, teams) {
  const teamIds = teams.map(team => team.id);

  return response.content.reduce((memo, match) => {
    const isTeamsRanked = match.teams.reduce((memo, team) => memo && teamIds.includes(team.id), true);
    const isTeamsConfirmed = match.teams.reduce((memo, team) => memo && !!team, true);

    if (isTeamsRanked && isTeamsConfirmed) {
      const {
        venue,
        teams: matchTeams = [],
        scores = [],
        status,
        rankingsWeight,
        matchId,
        time,
        competition,
      } = match;


      // Check if home advantage applies in this compeition.
      // I see nothing in the api data that can tell me this.
      // So I'm just going to keep a list `hasCompHomeAdvantage` here in the code and update
      // it whenever I see games where home advantage doesn't apply.
      const noHomeAdvantage = hasCompHomeAdvantage.some(t => t.test(competition));

      // I want to use the teams from the teams list rather than the match data since
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
      const isWorldCup = rankingsWeight == 2;

      return [
        ...memo,
        {
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
        },
      ];
    }

    return memo;
  }, []);
}
