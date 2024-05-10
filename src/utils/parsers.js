export const parseMatchResponse = (response, rankings) => {
  const teamIds = rankings.entries.map(({ team }) => team.id);

  return response.content.reduce((memo, match) => {
    const isRankedMatch = match.teams.reduce((memo, team) => memo && teamIds.includes(team.id), true);

    if (isRankedMatch) {
      const { venue, teams: matchTeams = [], scores = [], status, rankingsWeight, matchId, time } = match;
      const isComplete = status === 'C';

      const teams = rankings.entries.map(entry => entry.team);
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
        },
      ];
    }

    return memo;
  }, []);
};
