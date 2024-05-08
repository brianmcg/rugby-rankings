export const parseMatchResponse = (response, rankings) => {
  const teamIds = rankings.entries.map(({ team }) => team.id);

  return response.content.reduce((memo, match) => {
    const isRankedMatch = match.teams.reduce((memo, team) => memo && teamIds.includes(team.id), true);

    if (isRankedMatch) {
      const { venue, teams: matchTeams = [], scores = [], status, competition, matchId, time } = match;
      const isComplete = status === 'C';

      const teams = rankings.entries.map(entry => entry.team);

      return [
        ...memo,
          {
          homeTeam: teams.find(team => team.id === matchTeams[0]?.id) || null,
          awayTeam: teams.find(team => team.id === matchTeams[1]?.id) || null,
          homeScore: isComplete ? scores[0] : null,
          awayScore: isComplete ? scores[1] : null,
          isNeutralVenue: rankings.entries.map(({ name }) => name).includes(venue?.country),
          isWorldCup: !!competition?.toLowerCase().match(/rugby world cup/),
          updated: Date.now(),
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
