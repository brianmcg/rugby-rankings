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

      const isComplete = status === 'C';
      const homeTeam = teams.find(team => team.id === matchTeams[0]?.id) || null;
      const awayTeam = teams.find(team => team.id === matchTeams[1]?.id) || null;
      const homeScore = isComplete ? scores[0] : null;
      const awayScore = isComplete ? scores[1] : null;
      const isNeutralVenue = venue !== null && homeTeam.name !== venue?.country;
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
